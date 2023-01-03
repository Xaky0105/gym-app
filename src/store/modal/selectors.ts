import { RootState } from './../index';

export const selectSelectedDay = ({ modal: { daySelected } }: RootState) => daySelected;
export const selectIsOpenModalWorkout = ({ modal: { modalWorkoutIsOpen } }: RootState) => modalWorkoutIsOpen;
export const selectIsOpenConfirmModal = ({ modal: { confirmModalIsOpen } }: RootState) => confirmModalIsOpen;
export const selectIsOpenChangeAvatarModal = ({ modal: { changeAvatarModalIsOpen } }: RootState) =>
    changeAvatarModalIsOpen;
export const selectIsOpenReviewModal = ({ modal: { reviewModalIsOpen } }: RootState) => reviewModalIsOpen;
export const selectStepWorkoutModal = ({ modal: { stepWorkoutModal } }: RootState) => stepWorkoutModal;
export const selectTempIdWorkout = ({ modal: { idSelectedWorkout } }: RootState) => idSelectedWorkout;
export const selectTempIdExercise = ({ modal: { idSelectedExercise } }: RootState) => idSelectedExercise;
