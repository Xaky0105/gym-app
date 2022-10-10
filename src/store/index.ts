import { configureStore } from "@reduxjs/toolkit";
import daySlice from "./daySlice";
import modaleSlice from "./modaleSlice";
import monthReducer from './monthSlice'
import userSlice from "./userSlice";
import workoutSlice from "./workoutSlice";

const store = configureStore({
    reducer: {
        month: monthReducer,
        workout: workoutSlice,
        day: daySlice,
        user: userSlice,
        modal: modaleSlice,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch