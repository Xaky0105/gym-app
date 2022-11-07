import { RootState } from './../index';

export const selectWorkouts = ({ workout: { userWorkouts } }: RootState) => userWorkouts;
export const selectIsLoadingWorkouts = ({ workout: { isLoading } }: RootState) => isLoading;
