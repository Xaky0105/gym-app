import { createSlice } from "@reduxjs/toolkit";
import { Workout } from "../types/workout";

type WorkoutState = {
    userWorkouts: {
        [key: string]: Workout
    }
}

const initialState: WorkoutState = {
    userWorkouts: {}
}

const workoutsSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        addAndEditUserWorkout(state, {payload: {id, data}}) {
            state.userWorkouts[id] = data
        },
        deleteUserWorkout(state, action) {
            delete state.userWorkouts[action.payload]
        },
    }
})

export const {
    addAndEditUserWorkout,
    deleteUserWorkout,
} = workoutsSlice.actions
export default workoutsSlice.reducer