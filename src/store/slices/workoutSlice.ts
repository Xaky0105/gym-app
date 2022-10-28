import { ExerciseListType, UserWorkoutsStateType, Workout, WorkoutOnCalendar } from '@/types/workout';
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
        setNewExercise(state, action) {
            const { category, exercise } = action.payload;
            state.exerciseList[category].push(exercise);
        },
        removeExercise(state, action) {
            const { category, exercise } = action.payload;
            const filtredCatygoryExercise = state.exerciseList[category].filter((ex) => ex.id !== exercise.id);
            state.exerciseList[category] = filtredCatygoryExercise;
        },
        updateExercise(state, action) {
            const { category, updatedExerciseCategory } = action.payload;
            state.exerciseList[category] = updatedExerciseCategory;
        },
    },
});

export const {
    addOrEditUserWorkout,
    deleteUserWorkout,
    workoutsFetchComplete,
    setIsLoadingWorkout,
    exerciseListFetchComplete,
    setNewExercise,
    removeExercise,
    updateExercise,
} = workoutsSlice.actions;
export default workoutsSlice.reducer;
