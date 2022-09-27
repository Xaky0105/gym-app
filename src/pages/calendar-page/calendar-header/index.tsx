import React from "react";
import ButtonOutline from "../../../components/buttons/button-outline";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hook";
import { resetMonthIndex, decMonthIndex, incMonthIndex } from "../../../store/monthSlice";
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { getYear } from '../../../utils/dayjs'
import styles from './index.module.scss'

const CalendarHeader:React.FC = () => {
    const dispatch = useAppDispatch()
    const monthIndex = useAppSelector(state => state.month.monthIndex)
    const buttonCLickHandler = (func: ActionCreatorWithoutPayload<string>) => {
        dispatch(func())
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperGroupBtn}>
                <ButtonOutline 
                    text="Тренировка на сегодня"
                    callback={() => {}}
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