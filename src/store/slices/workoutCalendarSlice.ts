import { UserWorkoutsStateType, Workout } from '../../types/workout';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WorkoutCalendarState = {
    workoutsOnTheCalendar: UserWorkoutsStateType;
    isLoading: boolean;
    error: string;
};

const initialState: WorkoutCalendarState = {
    workoutsOnTheCalendar: {},
    isLoading: false,
    error: '',
};

const workoutsCalendarSlice = createSlice({
    name: 'workoutCalendar',
    initialState,
    reducers: {
        setIsLoadingWorkoutCalendar(state, action) {
            state.isLoading = action.payload;
        },
        addWorkoutToCalendar(state, action) {
            const id = action.payload.id;
            state.workoutsOnTheCalendar[id] = action.payload;
        },
        addSomeWorkoutsToCalendar(state, action: PayloadAction<Workout[]>) {
            const arrWorkouts = action.payload;
            arrWorkouts.forEach((workout) => {
                state.workoutsOnTheCalendar[workout.id] = workout;
            });
        },
        workoutsToCalendarFetchComplete(state, action) {
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
        updateExercise(state, action) {
            const { idSelectedWorkout, idSelectedExercise, exercise } = action.payload;
            state.workoutsOnTheCalendar[idSelectedWorkout].exercises[idSelectedExercise] = exercise;
        },
        setWorkoutCalendarError(state, action) {
            state.error = action.payload;
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
    updateExercise,
    setWorkoutCalendarError,
} = workoutsCalendarSlice.actions;
export default workoutsCalendarSlice.reducer;
