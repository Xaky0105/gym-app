import { createSlice } from "@reduxjs/toolkit";
import { Workout } from "../types/workout";

type UserWorkoutsStateType = {
    [key: string]: Workout
}

type WorkoutState = {
    userWorkouts: UserWorkoutsStateType
    isLoading: false
}

const initialState: WorkoutState = {
    userWorkouts: {},
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
        deleteUserWorkout(state, action) {
            delete state.userWorkouts[action.payload]
        },
        setIsLoadingWorkout(state, action) {
            state.isLoading = action.payload
        }
    }
})

export const {
    addOrEditUserWorkout,
    deleteUserWorkout,
    workoutsFetchComplete,
    setIsLoadingWorkout,
} = workoutsSlice.actions
export default workoutsSlice.reducer