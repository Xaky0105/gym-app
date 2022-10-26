import { ExerciseListType, HOW_TO_CHANGE_EXERCISE } from './../../types/workout';
import {
    BasicExercise,
    DELETE_WORKOUT_FROM_CALENDAR,
    ExerciseInWorkoutOnCalendar,
    EXERCISE_CATEGORY,
    HOW_TO_REPEAT,
    Workout,
    WorkoutOnCalendar,
} from '../../types/workout';
import { db } from '../../firebase';
import {
    doc,
    setDoc,
    collection,
    query,
    getDocs,
    updateDoc,
    deleteDoc,
    DocumentData,
    QuerySnapshot,
    writeBatch,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import { Dispatch } from '@reduxjs/toolkit';
import { generateArrWorkoutsForCalendar, getArrWorkoutsIdToDelete, getWorkoutsDates } from '../../utils/workout';

import { RootState } from '..';
import {
    addOrEditUserWorkout,
    deleteUserWorkout,
    exerciseListFetchComplete,
    removeExercise,
    setIsLoadingWorkout,
    setNewExercise,
    updateExercise,
    workoutsFetchComplete,
} from '../slices/workoutSlice';
import {
    workoutsToCalendarFetchComplete,
    addSomeWorkoutsToCalendar,
    addWorkoutToCalendar,
    deleteWorkoutFromCalendar,
    updateExerciseInWorkoutOnCalendar,
    deleteSomeWorkoutFromCalendar,
    setIsLoadingWorkoutCalendar,
    setWorkoutCalendarError,
} from '../slices/workoutCalendarSlice';
import _ from 'lodash';
import { getCategoryExercise } from '../../utils/exercise';

const getCurrentUserId = (getState: any) => {
    const {
        user: {
            user: { uid },
        },
    } = getState();
    return uid;
};

export const createOrEditWorkout = (workout: WorkoutOnCalendar | Workout, type: 'edit' | 'create') => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = getCurrentUserId(getState);
        try {
            const userWorkoutDoc = doc(db, `users/${uid}/workouts/${workout.id}`);
            if (type === 'create') {
                setDoc(userWorkoutDoc, workout);
            } else {
                updateDoc(userWorkoutDoc, workout as { [x: string]: any });
            }
            dispatch(addOrEditUserWorkout(workout as WorkoutOnCalendar));
        } catch (err) {
            console.log(err);
        }
    };
};

export const deleteWorkout = (id: string) => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = getCurrentUserId(getState);
        try {
            const userWorkoutsDoc = doc(db, `users/${uid}/workouts/${id}`);
            deleteDoc(userWorkoutsDoc);
            dispatch(deleteUserWorkout(id));
        } catch (err) {
            console.log(err);
        }
    };
};

export const loadWorkoutsData = () => {
    return async (dispatch: Dispatch, getState: any) => {
        dispatch(setIsLoadingWorkout(true));
        const uid = getCurrentUserId(getState);
        try {
            const workoutsData = await getDocs(query(collection(db, `users/${uid}/workouts`)));
            const workoutsOnCalendarData = await getDocs(query(collection(db, `users/${uid}/workoutsOnCalendar`)));
            const exerciseListData = await getDocs(query(collection(db, `users/${uid}/exerciseList`)));

            const setWorkoutsData = (snap: QuerySnapshot<DocumentData>, reducer: any) => {
                if (snap.size) {
                    const workouts = snap.docs.reduce((result, workout) => {
                        return {
                            ...result,
                            [workout.id]: workout.data(),
                        };
                    }, {});
                    dispatch(reducer(workouts));
                } else {
                    dispatch(reducer({}));
                }
            };

            const exerciseList: ExerciseListType = exerciseListData.docs.reduce((res, list) => (res = list.data()), {});
            dispatch(exerciseListFetchComplete(exerciseList));
            setWorkoutsData(workoutsData, workoutsFetchComplete);
            setWorkoutsData(workoutsOnCalendarData, workoutsToCalendarFetchComplete);
        } catch (err) {
            console.log(err);
        }
        dispatch(setIsLoadingWorkout(false));
    };
};

export const addWorkoutToCalendarAsync = (
    workout: WorkoutOnCalendar,
    howToRepeat: HOW_TO_REPEAT,
    repeatInterval: number,
) => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = getCurrentUserId(getState);
        const setWorkoutsData = async (
            howToRepeat: HOW_TO_REPEAT,
            workout: WorkoutOnCalendar,
            repeatInterval?: number,
        ) => {
            dispatch(setIsLoadingWorkoutCalendar(true));
            const workoutDates = getWorkoutsDates(howToRepeat, workout, repeatInterval);
            const workoutsArr = generateArrWorkoutsForCalendar(workout, workoutDates);
            const batch = writeBatch(db);
            workoutsArr.forEach((workout) => {
                const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${workout.id}`);
                batch.set(userWorkoutDoc, workout);
            });
            await batch.commit();
            dispatch(setIsLoadingWorkoutCalendar(false));
            dispatch(addSomeWorkoutsToCalendar(workoutsArr));
        };
        try {
            switch (howToRepeat) {
                case HOW_TO_REPEAT.DONT_REPEAT:
                    dispatch(setIsLoadingWorkoutCalendar(true));
                    const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${workout.id}`);
                    await setDoc(userWorkoutDoc, workout);
                    dispatch(setIsLoadingWorkoutCalendar(false));
                    dispatch(addWorkoutToCalendar(workout));
                    break;
                case HOW_TO_REPEAT.ONCE_A_WEEK:
                    await setWorkoutsData(HOW_TO_REPEAT.ONCE_A_WEEK, workout);
                    break;
                case HOW_TO_REPEAT.INTERVAL:
                    await setWorkoutsData(HOW_TO_REPEAT.INTERVAL, workout, repeatInterval);
                    break;
                case HOW_TO_REPEAT.EVERY_DAY:
                    await setWorkoutsData(HOW_TO_REPEAT.INTERVAL, workout, 0);
                    break;
            }
        } catch ({ message }) {
            if (typeof message === 'string') {
                dispatch(setWorkoutCalendarError(message));
                _.delay(() => dispatch(setWorkoutCalendarError('')), 2000);
            } else {
                console.log(message);
            }
        }
    };
};

export const deleteWorkoutFromCalendarAsync = (id: string, type: DELETE_WORKOUT_FROM_CALENDAR) => {
    return async (dispatch: Dispatch, getState: any) => {
        dispatch(setIsLoadingWorkoutCalendar(true));
        const uid = getCurrentUserId(getState);
        const {
            workoutCalendar: { workoutsOnTheCalendar },
        } = getState() as RootState;
        try {
            if (type === DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE) {
                const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${id}`);
                await deleteDoc(userWorkoutDoc);
                dispatch(deleteWorkoutFromCalendar(id));
            } else if (type === DELETE_WORKOUT_FROM_CALENDAR.THIS_AND_NEXT) {
                const arrIdToRemove = getArrWorkoutsIdToDelete(workoutsOnTheCalendar, id);
                const batch = writeBatch(db);
                arrIdToRemove.forEach((id) => {
                    const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${id}`);
                    batch.delete(userWorkoutDoc);
                });
                await batch.commit();
                dispatch(deleteSomeWorkoutFromCalendar(arrIdToRemove));
            }
        } catch ({ message }) {
            if (typeof message === 'string') {
                dispatch(setWorkoutCalendarError(message));
                _.delay(() => dispatch(setWorkoutCalendarError('')), 2000);
            } else {
                console.log(message);
            }
        }
        dispatch(setIsLoadingWorkoutCalendar(false));
    };
};

export const updateExerciseInWorkoutOnCalendarAsync = (exercise: ExerciseInWorkoutOnCalendar) => {
    return async (dispatch: Dispatch, getState: any) => {
        const {
            user: {
                user: { uid },
            },
            modal: { idSelectedExercise, idSelectedWorkout },
        } = getState();

        try {
            const field = `exercises.${idSelectedExercise}`;
            const userWorkoutRef = doc(db, `users/${uid}/workoutsOnCalendar/${idSelectedWorkout}`);
            updateDoc(userWorkoutRef, {
                [field]: exercise,
            });
            dispatch(
                updateExerciseInWorkoutOnCalendar({
                    exercise,
                    idSelectedExercise,
                    idSelectedWorkout,
                }),
            );
        } catch (err) {
            console.log(err);
        }
    };
};

export const changeExerciseAsync = (exercise: BasicExercise, howToChange: HOW_TO_CHANGE_EXERCISE) => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = getCurrentUserId(getState);
        const {
            workout: { exerciseList },
        } = getState();
        const category = getCategoryExercise(exercise.category as EXERCISE_CATEGORY);
        try {
            const exerciseListDoc = await getDocs(query(collection(db, `users/${uid}/exerciseList`)));
            const listId = exerciseListDoc.docs.reduce((acc, data) => (acc = data.id), '');
            const userExerciseListRef = doc(db, `users/${uid}/exerciseList/${listId}`);
            switch (howToChange) {
                case HOW_TO_CHANGE_EXERCISE.CREATE:
                    updateDoc(userExerciseListRef, {
                        [category]: arrayUnion(exercise),
                    });
                    dispatch(setNewExercise({ exercise, category }));
                    return;
                case HOW_TO_CHANGE_EXERCISE.DELETE:
                    updateDoc(userExerciseListRef, {
                        [category]: arrayRemove(exercise),
                    });
                    dispatch(removeExercise({ exercise, category }));
                    return;
                case HOW_TO_CHANGE_EXERCISE.UPDATE:
                    const updatedExerciseCategory: BasicExercise[] = exerciseList[category].map((ex: BasicExercise) =>
                        ex.id === exercise.id ? exercise : ex,
                    );
                    updateDoc(userExerciseListRef, {
                        [category]: updatedExerciseCategory,
                    });
                    dispatch(updateExercise({ updatedExerciseCategory, category }));
                    return;
            }
        } catch ({ message }) {
            console.log(message);
        }
    };
};
