import { createSelector } from '@reduxjs/toolkit'
import { Exercise } from '../../types/workout'
import { RootState } from './../index'

export const getMonthIndex = (state: RootState) => state.month.monthIndex

export const getSelectedDay = (state: RootState) => state.day.daySelected

export const getIsOpenModalWorkout = (state: RootState) => state.modal.modaleWorkoutIsOpen
export const getIsOpenConfirmModale = (state: RootState) => state.modal.confirmModaleIsOpen
export const getStepWorkoutModale = (state: RootState) => state.modal.stepWorkoutModale
export const getTempIdWorkout = (state: RootState) => state.modal.idSelectedWorkout
export const getTempIdExercise = (state: RootState) => state.modal.idSelectedExercise

export const getWorkouts = (state: RootState) => state.workout.userWorkouts
export const getWorkoutsFromCalendar = (state: RootState) => state.workout.workoutsOnTheCalendar
export const getIsLoadingWorkouts = (state: RootState) => state.workout.isLoading
export const getExerciseList = (state: RootState) => state.workout.exerciseList


export const getUser = (state: RootState) => state.user.user
export const getUserError = (state: RootState) => state.user.error
export const getUserIsLoading = (state: RootState) => state.user.isLoading
export const getUserEmail = (state: RootState) => state.user.user!.email
export const getUserPhoto = (state: RootState) => state.user.user!.photoURL

export const getUserPhotoByEmail = createSelector(
    getUserEmail,
    getUserPhoto,
    (email, photo) => {
        return photo ? photo : `https://ui-avatars.com/api/?size=128&name=${email}&font-size=0.53&background=ccc&color=fff&rounded=true`
    }
)

export const getWorkoutById = createSelector(
    getWorkoutsFromCalendar,
    getTempIdWorkout,
    (workouts, workoutId) => {
        return workouts[workoutId]
    }
)

export const getExerciseById = createSelector(
    getWorkoutById,
    getTempIdExercise,
    (workout, exerciseId) => {
        return workout.exercises[exerciseId] as Exercise
    }
)