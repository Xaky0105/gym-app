import { RootState } from './../index';

export const selectSelectedDay = ({ modal: { daySelected } }: RootState) => daySelected;
export const selectIsOpenModalWorkout = ({ modal: { modalWorkoutIsOpen } }: RootState) => modalWorkoutIsOpen;
export const selectIsOpenConfirmModale = ({ modal: { confirmModalIsOpen } }: RootState) => confirmModalIsOpen;
export const selectIsOpenChangeAvatarModal = ({ modal: { changeAvatarModalIsOpen } }: RootState) =>
    changeAvatarModalIsOpen;
export const selectIsOpenReviewModale = ({ modal: { reviewModalIsOpen } }: RootState) => reviewModalIsOpen;
export const selectStepWorkoutModale = ({ modal: { stepWorkoutModal } }: RootState) => stepWorkoutModal;
export const selectTempIdWorkout = ({ modal: { idSelectedWorkout } }: RootState) => idSelectedWorkout;
export const selectTempIdExercise = ({ modal: { idSelectedExercise } }: RootState) => idSelectedExercise;
