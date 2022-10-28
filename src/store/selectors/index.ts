import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './../index';

export const getMonthIndex = ({ month: { monthIndex } }: RootState) => monthIndex;

export const getSelectedDay = ({ modal: { daySelected } }: RootState) => daySelected;
export const getIsOpenModalWorkout = ({ modal: { modaleWorkoutIsOpen } }: RootState) => modaleWorkoutIsOpen;
export const getIsOpenConfirmModale = ({ modal: { confirmModaleIsOpen } }: RootState) => confirmModaleIsOpen;
export const getStepWorkoutModale = ({ modal: { stepWorkoutModale } }: RootState) => stepWorkoutModale;
export const getTempIdWorkout = ({ modal: { idSelectedWorkout } }: RootState) => idSelectedWorkout;
export const getTempIdExercise = ({ modal: { idSelectedExercise } }: RootState) => idSelectedExercise;

export const getWorkouts = ({ workout: { userWorkouts } }: RootState) => userWorkouts;
export const getIsLoadingWorkouts = ({ workout: { isLoading } }: RootState) => isLoading;
export const getExerciseList = ({ workout: { exerciseList } }: RootState) => exerciseList;

export const getWorkoutsForCalendar = ({ workoutCalendar: { workoutsOnTheCalendar } }: RootState) =>
    workoutsOnTheCalendar;
export const getIsLoadingWorkoutsCalendar = ({ workoutCalendar: { isLoading } }: RootState) => isLoading;
export const getWorkoutCalendarError = ({ workoutCalendar: { error } }: RootState) => error;

export const getUser = ({ user: { user } }: RootState) => user;
export const getUserError = ({ user: { error } }: RootState) => error;
export const getUserIsLoading = ({ user: { isLoading } }: RootState) => isLoading;
export const getUserName = (state: RootState) => state.user.user?.displayName;
export const getUserPhoto = (state: RootState) => state.user.user?.photoURL;

export const getUserPhotoByName = createSelector(getUserName, getUserPhoto, (name, photo) => {
    return (
        photo ||
        `https://ui-avatars.com/api/?size=128&name=${name}&font-size=0.53&background=ccc&color=fff&rounded=true`
    );
});

export const getWorkoutById = createSelector(getWorkoutsForCalendar, getTempIdWorkout, (workouts, workoutId) => {
    return workouts[workoutId];
});

export const getExerciseById = createSelector(getWorkoutById, getTempIdExercise, (workout, exerciseId) => {
    return workout.exercises[exerciseId];
});
