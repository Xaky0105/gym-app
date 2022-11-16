import { createSelector } from '@reduxjs/toolkit';

import { selectTempIdWorkout } from '../modal/selectors';

import { RootState } from './../index';

export const selectWorkoutsForCalendar = ({ workoutCalendar: { workoutsOnTheCalendar } }: RootState) =>
    workoutsOnTheCalendar;
export const selectIsLoadingWorkoutsCalendar = ({ workoutCalendar: { isLoading } }: RootState) => isLoading;
export const selectWorkoutCalendarError = ({ workoutCalendar: { error } }: RootState) => error;

export const selectWorkoutById = createSelector(
    selectWorkoutsForCalendar,
    selectTempIdWorkout,
    (workouts, workoutId) => {
        return workouts[workoutId];
    },
);