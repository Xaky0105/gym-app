import { configureStore } from "@reduxjs/toolkit";
import daySlice from "./slices/daySlice";
import modaleSlice from "./slices/modaleSlice";
import monthReducer from './slices/monthSlice'
import userSlice from "./slices/userSlice";
import workoutSlice from "./slices/workoutSlice";

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