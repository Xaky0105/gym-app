import { ExerciseListType } from '@/types/workout';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { changeExerciseAsync } from './asyncActions';
import { WorkoutState } from './types';

const initialState: WorkoutState = {
    exerciseList: {},
};

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        exerciseListFetchComplete(state, action: PayloadAction<ExerciseListType>) {
            state.exerciseList = action.payload;
        },
        setNewExercise(state, action) {
            const { category, exercise } = action.payload;
            state.exerciseList[category].push(exercise);
        },
        removeExercise(state, action) {
            const { category, exercise } = action.payload;
            const filterCategoryExercise = state.exerciseList[category].filter((ex) => ex.id !== exercise.id);
            state.exerciseList[category] = filterCategoryExercise;
        },
        updateExercise(state, action) {
            const { category, updatedExerciseCategory } = action.payload;
            state.exerciseList[category] = updatedExerciseCategory;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeExerciseAsync.pending, () => {});
    },
});

export const { exerciseListFetchComplete, setNewExercise, removeExercise, updateExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
