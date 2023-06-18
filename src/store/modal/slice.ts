import { STEP_MODAL } from '@/types/other';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WorkoutModalParams = {
    selectedWorkoutId?: string;
    selectedExerciseId?: string;
    selectedDay?: string;
};

type WorkoutModalState = {
    step: STEP_MODAL | null;
} & WorkoutModalParams;

export type ModalState = {
    confirmModalIsOpen: boolean;
    reviewModalIsOpen: boolean;
    changeAvatarModalIsOpen: boolean;
    workoutModal: WorkoutModalState;
};

const initialState: ModalState = {
    confirmModalIsOpen: false,
    reviewModalIsOpen: false,
    changeAvatarModalIsOpen: false,
    workoutModal: { step: null },
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setConfirmModalIsOpen(state, action: PayloadAction<boolean>) {
            state.confirmModalIsOpen = action.payload;
        },
        setReviewModalIsOpen(state, action: PayloadAction<boolean>) {
            state.reviewModalIsOpen = action.payload;
        },
        setChangeAvatarModalIsOpen(state, action: PayloadAction<boolean>) {
            state.changeAvatarModalIsOpen = action.payload;
        },
        openWorkoutModal(
            state,
            action: PayloadAction<
                {
                    step: STEP_MODAL;
                } & WorkoutModalParams
            >,
        ) {
            state.workoutModal = { ...state.workoutModal, ...action.payload };
        },
        closeWorkoutModal(state) {
            state.workoutModal = {
                step: null,
            };
        },
    },
});

export const {
    setConfirmModalIsOpen,
    setReviewModalIsOpen,
    setChangeAvatarModalIsOpen,
    openWorkoutModal,
    closeWorkoutModal,
} = modalSlice.actions;

export default modalSlice.reducer;
