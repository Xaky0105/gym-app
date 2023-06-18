import { RootState } from './../index';

// export const selectSelectedDay = ({ modal: { daySelected } }: RootState) => daySelected;
// export const selectIsOpenModalWorkout = ({ modal: { modalWorkoutIsOpen } }: RootState) => modalWorkoutIsOpen;
// export const selectIsOpenConfirmModal = ({ modal: { confirmModalIsOpen } }: RootState) => confirmModalIsOpen;
// export const selectIsOpenChangeAvatarModal = ({ modal: { changeAvatarModalIsOpen } }: RootState) =>
//     changeAvatarModalIsOpen;
// export const selectIsOpenReviewModal = ({ modal: { reviewModalIsOpen } }: RootState) => reviewModalIsOpen;
// export const selectStepWorkoutModal = ({ modal: { stepWorkoutModal } }: RootState) => stepWorkoutModal;
// export const selectTempIdWorkout = ({ modal: { idSelectedWorkout } }: RootState) => idSelectedWorkout;
// export const selectTempIdExercise = ({ modal: { idSelectedExercise } }: RootState) => idSelectedExercise;

export const selectSelectedDay = (state: RootState) => state.modal.workoutModal.selectedDay;
export const selectIsOpenModalWorkout = (state: RootState) => Boolean(state.modal.workoutModal.step);
export const selectStepWorkoutModal = (state: RootState) => state.modal.workoutModal.step;
export const selectTempIdWorkout = (state: RootState) => state.modal.workoutModal.selectedWorkoutId;
export const selectTempIdExercise = (state: RootState) => state.modal.workoutModal.selectedExerciseId;

export const selectIsOpenConfirmModal = ({ modal: { confirmModalIsOpen } }: RootState) => confirmModalIsOpen;
export const selectIsOpenChangeAvatarModal = ({ modal: { changeAvatarModalIsOpen } }: RootState) =>
    changeAvatarModalIsOpen;
export const selectIsOpenReviewModal = ({ modal: { reviewModalIsOpen } }: RootState) => reviewModalIsOpen;
