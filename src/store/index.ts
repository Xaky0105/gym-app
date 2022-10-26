import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import modaleSlice from './slices/modaleSlice';
import monthReducer from './slices/monthSlice';
import userSlice from './slices/userSlice';
import workoutSlice from './slices/workoutSlice';
import workoutCalendarSlice from './slices/workoutCalendarSlice';

export const store = configureStore({
    reducer: {
        month: monthReducer,
        workout: workoutSlice,
        user: userSlice,
        modal: modaleSlice,
        workoutCalendar: workoutCalendarSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
