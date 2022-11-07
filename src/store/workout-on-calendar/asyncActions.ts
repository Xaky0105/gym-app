import { deleteDoc, doc, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import _ from 'lodash';

import { db } from '@/firebase';
import {
    addSomeWorkoutsToCalendar,
    addWorkoutToCalendar,
    deleteSomeWorkoutFromCalendar,
    deleteWorkoutFromCalendar,
    setIsLoadingWorkoutCalendar,
    setWorkoutCalendarError,
    updateExerciseInWorkoutOnCalendar,
} from '@/store/workout-on-calendar/slice';
import {
    DELETE_WORKOUT_FROM_CALENDAR,
    ExerciseInWorkoutOnCalendar,
    HOW_TO_REPEAT,
    WorkoutOnCalendar,
} from '@/types/workout';
import { getCurrentUserId } from '@/utils/user';
import { generateArrWorkoutsForCalendar, getArrWorkoutsIdToDelete, getWorkoutsDates } from '@/utils/workout';
import { Dispatch } from '@reduxjs/toolkit';

import { RootState } from '..';

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
