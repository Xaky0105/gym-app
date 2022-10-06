import { RootState } from './../index';

export const getMonthIndex = (state: RootState) => state.month.monthIndex

export const getWorkouts = (state: RootState) => state.workout.userWorkouts
export const getIsLoadingWorkouts = (state: RootState) => state.workout.isLoading

export const getUser = (state: RootState) => state.user.user
export const getUserError = (state: RootState) => state.user.error
export const getUserIsLoading = (state: RootState) => state.user.isLoading