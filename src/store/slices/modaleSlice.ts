import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STEP_MODAL } from '../../components/modals/workout-content';

type ModaleState = {
    modaleWorkoutIsOpen: boolean;
    confirmModaleIsOpen: boolean;
    stepWorkoutModale: STEP_MODAL;
    idSelectedWorkout: string;
    idSelectedExercise: string;
    daySelected: string;
};

const initialState: ModaleState = {
    modaleWorkoutIsOpen: false,
    confirmModaleIsOpen: false,
    stepWorkoutModale: STEP_MODAL.WORKOUTS,
    idSelectedWorkout: '',
    idSelectedExercise: '',
    daySelected: '',
};

const modaleSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModaleWorkoutIsOpen(state, action) {
            state.modaleWorkoutIsOpen = action.payload;
            if (!state.modaleWorkoutIsOpen) {
                state.idSelectedExercise = '';
                state.idSelectedWorkout = '';
                state.daySelected = '';
            }
        },
        setConfirmModaleIsOpen(state, action) {
            state.confirmModaleIsOpen = action.payload;
        },
        setStepWorkoutModale(state, action) {
            state.stepWorkoutModale = action.payload;
        },
        setTempIdWorkout(state, action) {
            state.idSelectedWorkout = action.payload;
        },
        setTempIdExercise(state, action) {
            state.idSelectedExercise = action.payload;
        },
        changeDaySelected(state, action: PayloadAction<string>) {
            state.daySelected = action.payload;
        },
    },
});

export const {
    setModaleWorkoutIsOpen,
    setConfirmModaleIsOpen,
    setStepWorkoutModale,
    setTempIdWorkout,
    setTempIdExercise,
    changeDaySelected,
} = modaleSlice.actions;

export default modaleSlice.reducer;
