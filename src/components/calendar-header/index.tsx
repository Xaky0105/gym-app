import React from "react";
import ButtonOutline from "../buttons/button-outline";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { resetMonthIndex, decMonthIndex, incMonthIndex } from "../../store/monthSlice";
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { getCurrentDay, getYear } from '../../utils/dayjs'
import { getMonthIndex } from "../../store/selectors";
import { changeDaySelected } from "../../store/daySlice";
import styles from './index.module.scss'
import { setStepWorkoutModale, toggleModale } from "../../store/modaleSlice";
import { STEP_MODAL } from "../modals/workout-content";

const CalendarHeader:React.FC = () => {
    const dispatch = useAppDispatch()
    const monthIndex = useAppSelector(getMonthIndex)
    const buttonCLickHandler = (func: ActionCreatorWithoutPayload<string>) => {
        dispatch(func())
    }
    const workoutForDayClickHandler = () => {
        dispatch(changeDaySelected(getCurrentDay()))
        dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS))
        dispatch(toggleModale())
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperGroupBtn}>
                <ButtonOutline 
                    text="Тренировка на сегодня"
                    callback={workoutForDayClickHandler}
                />
            </div>
            <div className={styles.wrapperGroupBtn}>
                <ButtonOutline 
                    text="Сегодня" 
                    callback={() => buttonCLickHandler(resetMonthIndex)}
                />
                <div 
                    className={styles.btnWrapper}
                    onClick={() => buttonCLickHandler(decMonthIndex)}
                >
                    <MdArrowBackIosNew />
                </div>
                <div 
                    className={styles.btnWrapper}
                    onClick={() => buttonCLickHandler(incMonthIndex)}
                >
                    <MdArrowForwardIos />
                </div>
                <h3 className={styles.data}>
                    {getYear(monthIndex)} 
                </h3>
            </div>
        </div>
    )
}

export default CalendarHeader