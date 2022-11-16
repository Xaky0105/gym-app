import { STEP_MODAL } from '@/types/modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalState } from './types';

const initialState: ModalState = {
    modalWorkoutIsOpen: false,
    confirmModalIsOpen: false,
    reviewModalIsOpen: false,
    changeAvatarModalIsOpen: false,
    stepWorkoutModal: STEP_MODAL.WORKOUTS,
    idSelectedWorkout: '',
    idSelectedExercise: '',
    daySelected: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalWorkoutIsOpen(state, action: PayloadAction<boolean>) {
            state.modalWorkoutIsOpen = action.payload;
            if (!state.modalWorkoutIsOpen) {
                state.idSelectedExercise = '';
                state.idSelectedWorkout = '';
                state.daySelected = '';
            }
        },
        setConfirmModalIsOpen(state, action: PayloadAction<boolean>) {
            state.confirmModalIsOpen = action.payload;
        },
        setReviewModalIsOpen(state, action: PayloadAction<boolean>) {
            state.reviewModalIsOpen = action.payload;
        },
        setChangeAvatarModalIsOpen(state, action: PayloadAction<boolean>) {
            state.changeAvatarModalIsOpen = action.payload;
        },
        setStepWorkoutModal(state, action: PayloadAction<STEP_MODAL>) {
            state.stepWorkoutModal = action.payload;
        },
        setTempIdWorkout(state, action: PayloadAction<string>) {
            state.idSelectedWorkout = action.payload;
        },
        setTempIdExercise(state, action: PayloadAction<string>) {
            state.idSelectedExercise = action.payload;
        },
        changeDaySelected(state, action: PayloadAction<string>) {
            state.daySelected = action.payload;
        },
    },
});

export const {
    setModalWorkoutIsOpen,
    setConfirmModalIsOpen,
    setReviewModalIsOpen,
    setChangeAvatarModalIsOpen,
    setStepWorkoutModal,
    setTempIdWorkout,
    setTempIdExercise,
    changeDaySelected,
} = modalSlice.actions;

export default modalSlice.reducer;
