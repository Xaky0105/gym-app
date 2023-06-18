import { ExerciseInWorkoutOnCalendar, WorkoutOnCalendar } from '@/types/workout';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WorkoutCalendarState } from './types';

const initialState: WorkoutCalendarState = {
    workoutsOnTheCalendar: {},
    isLoading: false,
};

const workoutsCalendarSlice = createSlice({
    name: 'workoutCalendar',
    initialState,
    reducers: {
        setIsLoadingWorkoutCalendar(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        addWorkoutToCalendar(state, action: PayloadAction<WorkoutOnCalendar>) {
            const id = action.payload.id;
            state.workoutsOnTheCalendar[id] = action.payload;
        },
        addSomeWorkoutsToCalendar(state, action: PayloadAction<WorkoutOnCalendar[]>) {
            const arrWorkouts = action.payload;
            arrWorkouts.forEach((workout) => {
                state.workoutsOnTheCalendar[workout.id] = workout;
            });
        },
        workoutsToCalendarFetchComplete(state, action: PayloadAction<{ [key: string]: WorkoutOnCalendar }>) {
            state.workoutsOnTheCalendar = action.payload;
        },
        deleteWorkoutFromCalendar(state, action: PayloadAction<string>) {
            delete state.workoutsOnTheCalendar[action.payload];
        },
        deleteSomeWorkoutFromCalendar(state, action: PayloadAction<string[]>) {
            action.payload.forEach((id) => {
                delete state.workoutsOnTheCalendar[id];
            });
        },
        updateExerciseInWorkoutOnCalendar(
            state,
            action: PayloadAction<{
                idSelectedWorkout: string;
                idSelectedExercise: string;
                exercise: ExerciseInWorkoutOnCalendar;
            }>,
        ) {
            const { idSelectedWorkout, idSelectedExercise, exercise } = action.payload;
            state.workoutsOnTheCalendar[idSelectedWorkout].exercises[idSelectedExercise] = exercise;
        },
    },
});

export const {
    setIsLoadingWorkoutCalendar,
    addWorkoutToCalendar,
    addSomeWorkoutsToCalendar,
    workoutsToCalendarFetchComplete,
    deleteWorkoutFromCalendar,
    deleteSomeWorkoutFromCalendar,
    updateExerciseInWorkoutOnCalendar,
} = workoutsCalendarSlice.actions;
export const workoutCalendarActions = workoutsCalendarSlice.actions;
export const workoutsCalendarReducer = workoutsCalendarSlice.reducer;
