import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook'
import { daysNotIncludedInCurrentMonth, getCurrentDay } from '../../utils/dayjs';
import dayjs, { Dayjs } from 'dayjs';
import { getMonthIndex, getWorkoutsFromCalendar } from '../../store/selectors';
import { setStepWorkoutModale, setTempIdWorkout, toggleModale } from '../../store/modaleSlice';
import { changeDaySelected } from '../../store/daySlice';
import { STEP_MODAL } from '../modals/workout-content';
import _ from 'lodash'
import styles from './index.module.scss'

interface DayProps {
    day: Dayjs,
    row: number
}

const Day: React.FC<DayProps> = ({day, row}) => {
    const dispatch = useAppDispatch()

    const monthIndex = useAppSelector(getMonthIndex)
    const workoutsFromCalendar = useAppSelector(getWorkoutsFromCalendar)
    const workoutsForTheDay = _.toArray(workoutsFromCalendar)
        .filter((workout) => workout.date === day.format('DD/MM/YYYY'))

    const currentDayClass = day.format('DD/MM/YYYY') === getCurrentDay() ? `${styles.currentDay}`: '' 
    const dayNotThisMonth = day.month() !== daysNotIncludedInCurrentMonth(monthIndex) ? `${styles.dayOfTheLastMonth}` : ''
    const disabledTrainingItemClass = day.month() !== dayjs().month(monthIndex).month() ? `${styles.disabled}` : ''

    const dayClickHandler = () => {
        if (!dayNotThisMonth) {
            dispatch(changeDaySelected(day.format('DD/MM/YYYY')))
            dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS))
            dispatch(toggleModale())
        }
    }

    const workoutOnClick = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(setTempIdWorkout(id))
        dispatch(changeDaySelected(day.format('DD/MM/YYYY')))
        dispatch(setStepWorkoutModale(STEP_MODAL.EXERCISES))
        dispatch(toggleModale())
    }

    return (
        <div 
            className={`${styles.wrapper} ${currentDayClass} ${dayNotThisMonth}`}
            onClick={dayClickHandler}
        >
            <div className={styles.dayHeader}>
                {row === 0 && <span className={styles.dayWeek}>{day.format('dd').toUpperCase()}</span>}
                <span className={styles.number}>
                    {day.format('DD')}
                </span>
            </div>
            
            <div className={styles.workoutList}>
                {workoutsForTheDay.map((workout) => (
                    <div 
                        key={workout.id} 
                        className={`${styles.workout} ${disabledTrainingItemClass}`}
                        onClick={workoutOnClick(workout.id)}
                    >
                        {workout.workoutName}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Day