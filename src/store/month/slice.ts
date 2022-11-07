import dayjs from 'dayjs';

import { createSlice } from '@reduxjs/toolkit';

import { MonthState } from './types';

const initialState: MonthState = {
    monthIndex: dayjs().month(),
};
const monthSlice = createSlice({
    name: 'month',
    initialState,
    reducers: {
        incMonthIndex(state) {
            state.monthIndex = state.monthIndex + 1;
        },
        decMonthIndex(state) {
            state.monthIndex = state.monthIndex - 1;
        },
        resetMonthIndex(state) {
            state.monthIndex = dayjs().month();
        },
    },
});

export const { incMonthIndex, decMonthIndex, resetMonthIndex } = monthSlice.actions;

export default monthSlice.reducer;
