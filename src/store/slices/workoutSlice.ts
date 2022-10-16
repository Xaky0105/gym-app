import { ExerciseListType, UserWorkoutsStateType, Workout } from '../../types/workout';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WorkoutState = {
    exerciseList: ExerciseListType
    userWorkouts: UserWorkoutsStateType
    workoutsOnTheCalendar: UserWorkoutsStateType
    isLoading: boolean
}

const initialState: WorkoutState = {
    exerciseList: {},
    userWorkouts: {},
    workoutsOnTheCalendar: {},
    isLoading: false
}

const workoutsSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        addOrEditUserWorkout(state, action) {
            state.userWorkouts[action.payload.id] = action.payload
        },
        workoutsFetchComplete(state, action) {
            state.userWorkouts = action.payload
        },
        deleteUserWorkout(state, action: PayloadAction<string>) {
            delete state.userWorkouts[action.payload]
        },
        setIsLoadingWorkout(state, action) {
            state.isLoading = action.payload
        },
        addWorkoutToCalendar(state, action) {
            const id = action.payload.id
            state.workoutsOnTheCalendar[id] = action.payload
        },
        addSomeWorkoutsToCalendar(state, action: PayloadAction<Workout[]>) {
            const arrWorkouts = action.payload
            arrWorkouts.forEach((workout) => {
                state.workoutsOnTheCalendar[workout.id] = workout 
            })
        },
        workoutsToCalendarFetchComplete(state, action) {
            state.workoutsOnTheCalendar = action.payload
        },
        deleteWorkoutFromCalendar(state, action: PayloadAction<string>) {
            delete state.workoutsOnTheCalendar[action.payload]
        },
        deleteSomeWorkoutFromCalendar(state, action: PayloadAction<string[]>) { 
            action.payload.forEach((id) => {
                delete state.workoutsOnTheCalendar[id]
            })
        },
        exerciseListFetchComplete(state, action) {
            state.exerciseList = action.payload
        },
        updateExercise(state, action) {
            const { idSelectedWorkout, idSelectedExercise, exercise } = action.payload
            state.workoutsOnTheCalendar[idSelectedWorkout].exercises[idSelectedExercise] = exercise
        }
    }
})

export const {
    addOrEditUserWorkout,
    deleteUserWorkout,
    workoutsFetchComplete,
    setIsLoadingWorkout,
    addWorkoutToCalendar,
    addSomeWorkoutsToCalendar,
    workoutsToCalendarFetchComplete,
    deleteWorkoutFromCalendar,
    deleteSomeWorkoutFromCalendar,
    exerciseListFetchComplete,
    updateExercise
} = workoutsSlice.actions
export default workoutsSlice.reducer