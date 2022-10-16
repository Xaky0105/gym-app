import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentDay } from "../../utils/dayjs";

type DayState = {
    daySelected: string,
}

const initialState: DayState = {
    daySelected: getCurrentDay(),
}

const daySlice = createSlice({
    name: 'day',
    initialState,
    reducers: {
        changeDaySelected(state, action: PayloadAction<string>) {
            state.daySelected = action.payload
        }
    }
})

export const { changeDaySelected } = daySlice.actions

export default daySlice.reducer