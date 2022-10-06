import { configureStore } from "@reduxjs/toolkit";
import monthReducer from './monthSlice'
import userSlice from "./userSlice";
import workoutSlice from "./workoutSlice";

const store = configureStore({
    reducer: {
        month: monthReducer,
        workout: workoutSlice,
        user: userSlice,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch