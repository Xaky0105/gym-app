import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocs,
    query,
    QuerySnapshot,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import { db } from '@/firebase';
import {
    addOrEditUserWorkout,
    deleteUserWorkout,
    setIsLoadingWorkout,
    workoutsFetchComplete,
} from '@/store/workout/slice';
import { workoutsToCalendarFetchComplete } from '@/store/workout-on-calendar/slice';
import { EnqueueSnackbar } from '@/types/other';
import { Workout, WorkoutOnCalendar } from '@/types/workout';
import { ExerciseListType } from '@/types/workout';
import { getCurrentUserId } from '@/utils/user';
import { Dispatch } from '@reduxjs/toolkit';

import { exerciseListFetchComplete } from '../exercises/slice';

export const createOrEditWorkout = (
    workout: WorkoutOnCalendar | Workout,
    type: 'edit' | 'create',
    enqueueSnackbar: EnqueueSnackbar,
) => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = getCurrentUserId(getState);
        try {
            const userWorkoutDoc = doc(db, `users/${uid}/workouts/${workout.id}`);
            if (type === 'create') {
                setDoc(userWorkoutDoc, workout);
                enqueueSnackbar('Тренировка создана, теперь вы можете добавить её на календарь', {
                    variant: 'success',
                });
            } else {
                updateDoc(userWorkoutDoc, workout as { [x: string]: any });
                enqueueSnackbar('Тренировка отредактирована', { variant: 'success' });
            }
            dispatch(addOrEditUserWorkout(workout as WorkoutOnCalendar));
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не получилось создать/отредактировать тренировку', { variant: 'error' });
        }
    };
};

export const deleteWorkout = (id: string, enqueueSnackbar: EnqueueSnackbar) => {
    return async (dispatch: Dispatch, getState: any) => {
        const uid = getCurrentUserId(getState);
        try {
            const userWorkoutsDoc = doc(db, `users/${uid}/workouts/${id}`);
            await deleteDoc(userWorkoutsDoc);
            dispatch(deleteUserWorkout(id));
            enqueueSnackbar('Тренировка успешно удалена', { variant: 'success' });
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не получилось удалить тренировку', { variant: 'error' });
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
