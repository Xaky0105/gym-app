import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import exerciseSlice from './exercises/slice';
import modalSlice from './modal/slice';
import monthReducer from './month/slice';
import userSlice from './user/slice';
import workoutSlice from './workout/slice';
import workoutCalendarSlice from './workout-on-calendar/slice';

export const store = configureStore({
    reducer: {
        month: monthReducer,
        workout: workoutSlice,
        user: userSlice,
        modal: modalSlice,
        workoutCalendar: workoutCalendarSlice,
        exercise: exerciseSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
