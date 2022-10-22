import {
    DELETE_WORKOUT_FROM_CALENDAR,
    ExerciseInWorkoutOnCalendar,
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
} from 'firebase/firestore';
import { Dispatch } from '@reduxjs/toolkit';
import { generateArrWorkoutsForCalendar, getArrWorkoutsIdToDelete, getWorkoutsDates } from '../../utils/workout';

import { RootState } from '..';
import {
    addOrEditUserWorkout,
    deleteUserWorkout,
    setIsLoadingWorkout,
    workoutsFetchComplete,
} from '../slices/workoutSlice';
import {
    workoutsToCalendarFetchComplete,
    addSomeWorkoutsToCalendar,
    addWorkoutToCalendar,
    deleteWorkoutFromCalendar,
    updateExercise,
    deleteSomeWorkoutFromCalendar,
    setIsLoadingWorkoutCalendar,
    setWorkoutCalendarError,
} from '../slices/workoutCalendarSlice';
import _ from 'lodash';

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
        try {
            const uid = getCurrentUserId(getState);

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
        try {
            const uid = getCurrentUserId(getState);
            const userWorkoutsDoc = doc(db, `users/${uid}/workouts/${id}`);
            deleteDoc(userWorkoutsDoc);
            dispatch(deleteUserWorkout(id));
        } catch (err) {
            console.log(err);
        }
    };
};

export const loadWorkouts = () => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch(setIsLoadingWorkout(true));
            const uid = getCurrentUserId(getState);
            const userWorkoutsCollectionReference = collection(db, `users/${uid}/workouts`);
            const userWorkoutsOnCalendarCollectionRef = collection(db, `users/${uid}/workoutsOnCalendar`);
            const workoutsQuery = query(userWorkoutsCollectionReference);
            const workoutsOnCalendarQuery = query(userWorkoutsOnCalendarCollectionRef);
            const workoutsCollectionData = await getDocs(workoutsQuery);
            const workoutsOnCalendarCollectionData = await getDocs(workoutsOnCalendarQuery);
            const formattingWorkoutsData = (data: QuerySnapshot<DocumentData>) => {
                type WorkoutType = {
                    [key: string]: object;
                };
                const workouts: WorkoutType = {};
                data.forEach((workout) => {
                    workouts[workout.id] = workout.data();
                });
                return workouts;
            };
            const setWorkoutsData = (collection: QuerySnapshot<DocumentData>, reducer: any) => {
                if (collection.size) {
                    const workouts = formattingWorkoutsData(collection);
                    dispatch(reducer(workouts));
                } else {
                    dispatch(reducer({}));
                }
            };
            setWorkoutsData(workoutsCollectionData, workoutsFetchComplete);
            setWorkoutsData(workoutsOnCalendarCollectionData, workoutsToCalendarFetchComplete);
            dispatch(setIsLoadingWorkout(false));
        } catch (err) {
            console.log(err);
        }
    };
};

export const addWorkoutToCalendarAsync = (
    workout: WorkoutOnCalendar,
    howToRepeat: HOW_TO_REPEAT,
    repeatInterval: number,
) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
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
        try {
            dispatch(setIsLoadingWorkoutCalendar(true));
            const state = getState() as RootState;
            const uid = getCurrentUserId(getState);
            if (type === DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE) {
                const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${id}`);
                await deleteDoc(userWorkoutDoc);
                dispatch(deleteWorkoutFromCalendar(id));
            } else if (type === DELETE_WORKOUT_FROM_CALENDAR.THIS_AND_NEXT) {
                const {
                    workoutCalendar: { workoutsOnTheCalendar },
                } = state;
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
            dispatch(setWorkoutCalendarError(message as string));
            _.delay(() => dispatch(setWorkoutCalendarError('')), 2000);
        }
        dispatch(setIsLoadingWorkoutCalendar(false));
    };
};

export const updateExerciseAsync = (exercise: ExerciseInWorkoutOnCalendar) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const {
                user: {
                    user: { uid },
                },
                modal: { idSelectedExercise, idSelectedWorkout },
            } = getState();
            const field = `exercises.${idSelectedExercise}`;
            const userWorkoutRef = doc(db, `users/${uid}/workoutsOnCalendar/${idSelectedWorkout}`);
            updateDoc(userWorkoutRef, {
                [field]: exercise,
            });
            dispatch(
                updateExercise({
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
