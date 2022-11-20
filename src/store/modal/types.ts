import { STEP_MODAL } from '@/types/other';
export type ModalState = {
    modalWorkoutIsOpen: boolean;
    confirmModalIsOpen: boolean;
    reviewModalIsOpen: boolean;
    changeAvatarModalIsOpen: boolean;
    stepWorkoutModal: STEP_MODAL;
    idSelectedWorkout: string;
    idSelectedExercise: string;
    daySelected: string;
};
