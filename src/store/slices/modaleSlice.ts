import { createSlice } from "@reduxjs/toolkit";
import { STEP_MODAL } from "../../components/modals/workout-content";

type ModaleState = {
    modaleWorkoutIsOpen: boolean
    confirmModaleIsOpen: boolean
    stepWorkoutModale: STEP_MODAL
    idSelectedWorkout: string
    idSelectedExercise: string
}

const initialState: ModaleState = {
    modaleWorkoutIsOpen: false,
    confirmModaleIsOpen: false,
    stepWorkoutModale: STEP_MODAL.WORKOUTS,
    idSelectedWorkout: '',
    idSelectedExercise: ''
}

const modaleSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModale(state) {
            state.modaleWorkoutIsOpen = !state.modaleWorkoutIsOpen
            if (!state.modaleWorkoutIsOpen) {
                state.idSelectedExercise = ''
                state.idSelectedWorkout = ''
            }
        },
        toggleConfirmModale(state) {
            state.confirmModaleIsOpen = !state.confirmModaleIsOpen
        },
        setStepWorkoutModale(state, action) {
            state.stepWorkoutModale = action.payload
        },
        setTempIdWorkout(state, action) {
            state.idSelectedWorkout = action.payload
        },
        setTempIdExercise(state, action) {
            state.idSelectedExercise = action.payload
        },
    }
})

export const { 
    toggleModale,
    toggleConfirmModale, 
    setStepWorkoutModale,
    setTempIdWorkout,
    setTempIdExercise
} = modaleSlice.actions

export default modaleSlice.reducer