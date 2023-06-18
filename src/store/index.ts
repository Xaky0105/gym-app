import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import exerciseSlice from './exercises/slice';
import modalSlice from './modal/slice';
import monthReducer from './month/slice';
import reviewsSlice from './reviews/slice';
import userSlice from './user/slice';
import workoutSlice from './workout/slice';
import { workoutsCalendarReducer } from './workout-on-calendar/slice';

export const store = configureStore({
    reducer: {
        month: monthReducer,
        workout: workoutSlice,
        user: userSlice,
        modal: modalSlice,
        workoutCalendar: workoutsCalendarReducer,
        exercise: exerciseSlice,
        reviews: reviewsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
