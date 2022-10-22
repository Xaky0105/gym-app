import { ExerciseListType, UserWorkoutsStateType, Workout, WorkoutOnCalendar } from '../../types/workout';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WorkoutState = {
    exerciseList: ExerciseListType;
    userWorkouts: UserWorkoutsStateType;
    isLoading: boolean;
};

const initialState: WorkoutState = {
    exerciseList: {},
    userWorkouts: {},
    isLoading: false,
};

const workoutsSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        addOrEditUserWorkout(state, action: PayloadAction<WorkoutOnCalendar>) {
            state.userWorkouts[action.payload.id] = action.payload;
        },
        workoutsFetchComplete(state, action: PayloadAction<UserWorkoutsStateType>) {
            state.userWorkouts = action.payload;
        },
        deleteUserWorkout(state, action: PayloadAction<string>) {
            delete state.userWorkouts[action.payload];
        },
        setIsLoadingWorkout(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        exerciseListFetchComplete(state, action: PayloadAction<ExerciseListType>) {
            state.exerciseList = action.payload;
        },
    },
});

export const {
    addOrEditUserWorkout,
    deleteUserWorkout,
    workoutsFetchComplete,
    setIsLoadingWorkout,
    exerciseListFetchComplete,
} = workoutsSlice.actions;
export default workoutsSlice.reducer;
