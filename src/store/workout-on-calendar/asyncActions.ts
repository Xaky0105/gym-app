import { deleteDoc, doc, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import _ from 'lodash';

import { db } from '@/firebase';
import {
    addSomeWorkoutsToCalendar,
    addWorkoutToCalendar,
    deleteSomeWorkoutFromCalendar,
    deleteWorkoutFromCalendar,
    setIsLoadingWorkoutCalendar,
    updateExerciseInWorkoutOnCalendar,
} from '@/store/workout-on-calendar/slice';
import { EnqueueSnackbar } from '@/types/other';
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
    enqueueSnackbar: EnqueueSnackbar,
) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
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
            enqueueSnackbar('Тренировки на календарь успешно добавлены', { variant: 'success' });
        };
        try {
            switch (howToRepeat) {
                case HOW_TO_REPEAT.DONT_REPEAT:
                    dispatch(setIsLoadingWorkoutCalendar(true));
                    const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${workout.id}`);
                    await setDoc(userWorkoutDoc, workout);
                    dispatch(setIsLoadingWorkoutCalendar(false));
                    dispatch(addWorkoutToCalendar(workout));
                    enqueueSnackbar('Тренировка на календарь успешно добавлена', { variant: 'success' });
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
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не удалось добавить тренировку', { variant: 'error' });
        }
    };
};

export const deleteWorkoutFromCalendarAsync = (
    id: string,
    type: DELETE_WORKOUT_FROM_CALENDAR,
    enqueueSnackbar: EnqueueSnackbar,
) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
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
                enqueueSnackbar('Тренировка удалена', { variant: 'success' });
            } else if (type === DELETE_WORKOUT_FROM_CALENDAR.THIS_AND_NEXT) {
                const arrIdToRemove = getArrWorkoutsIdToDelete(workoutsOnTheCalendar, id);
                const batch = writeBatch(db);
                arrIdToRemove.forEach((id) => {
                    const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${id}`);
                    batch.delete(userWorkoutDoc);
                });
                await batch.commit();
                dispatch(deleteSomeWorkoutFromCalendar(arrIdToRemove));
                enqueueSnackbar('Тренировки данного типа удалены', { variant: 'success' });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не получилось удалить тренировку', { variant: 'error' });
        }
        dispatch(setIsLoadingWorkoutCalendar(false));
    };
};

export const updateExerciseInWorkoutOnCalendarAsync = (exercise: ExerciseInWorkoutOnCalendar) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const {
            user: { user },
            modal: {
                workoutModal: { selectedExerciseId, selectedWorkoutId },
            },
        } = getState();

        if (!user || !selectedExerciseId || !selectedWorkoutId) {
            return;
        }

        try {
            const field = `exercises.${selectedExerciseId}`;
            const userWorkoutRef = doc(db, `users/${user.uid}/workoutsOnCalendar/${selectedWorkoutId}`);
            updateDoc(userWorkoutRef, {
                [field]: exercise,
            });
            dispatch(
                updateExerciseInWorkoutOnCalendar({
                    exercise,
                    idSelectedExercise: selectedExerciseId,
                    idSelectedWorkout: selectedWorkoutId,
                }),
            );
        } catch (err) {
            console.log(err);
        }
    };
};
