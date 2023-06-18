import { createSelector } from '@reduxjs/toolkit';

import { selectTempIdExercise } from '../modal/selectors';
import { selectWorkoutById } from '../workout-on-calendar/selectors';

import { RootState } from './../index';
export const selectExerciseList = ({ exercise: { exerciseList } }: RootState) => exerciseList;
export const selectExerciseById = createSelector(selectWorkoutById, selectTempIdExercise, (workout, exerciseId) => {
    return exerciseId && workout ? workout.exercises[exerciseId] : undefined;
});
