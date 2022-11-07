import { STEP_MODAL } from '@/types/modal';
export type ModalState = {
    modalWorkoutIsOpen: boolean;
    confirmModalIsOpen: boolean;
    stepWorkoutModal: STEP_MODAL;
    idSelectedWorkout: string;
    idSelectedExercise: string;
    daySelected: string;
};
