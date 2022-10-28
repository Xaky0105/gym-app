import { FC, useMemo } from 'react';
import { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { getMonthIndex, getSelectedDay, getTempIdWorkout } from '@/store/selectors';
import {
    changeDaySelected,
    setModaleWorkoutIsOpen,
    setStepWorkoutModale,
    setTempIdWorkout,
} from '@/store/slices/modaleSlice';
import { DAY_FORMAT } from '@/types/day';
import { STEP_MODAL } from '@/types/modal';
import { WorkoutOnCalendar } from '@/types/workout';
import { getCurrentDay, getMonthIndexFromZeroToEleven } from '@/utils/dayjs';
import { getWorkoutForTheDay } from '@/utils/workout';

import styles from './index.module.scss';

interface DayProps {
    day: Dayjs;
    row: number;
    workoutsForMonth: WorkoutOnCalendar[];
}

export const Day: FC<DayProps> = ({ day, row, workoutsForMonth }) => {
    console.log('render');
    const dispatch = useAppDispatch();
    const monthIndex = useAppSelector(getMonthIndex);
    const selectedWorkoutId = useAppSelector(getTempIdWorkout);
    const daySelected = useAppSelector(getSelectedDay);

    const dayFormat = day.format(DAY_FORMAT.YYYY_MM_DD);

    const workoutsForTheDay = useMemo(() => getWorkoutForTheDay(dayFormat, workoutsForMonth), [workoutsForMonth]);

    const currentDayClass = dayFormat === getCurrentDay() ? `${styles.currentDay}` : '';

    const dayNotThisMonth =
        day.month() !== getMonthIndexFromZeroToEleven(monthIndex) ? `${styles.dayOfTheLastMonth}` : '';

    const workoutSelected = (id: string) => (selectedWorkoutId === id ? `${styles.selectWorkout}` : '');

    const daySelectedClass = daySelected === dayFormat ? `${styles.daySelect}` : '';

    const dayClickHandler = () => {
        if (!dayNotThisMonth) {
            dispatch(changeDaySelected(dayFormat));
            dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS));
            dispatch(setModaleWorkoutIsOpen(true));
        }
    };

    const workoutOnClick = (id: string) => {
        dispatch(setTempIdWorkout(id));
        dispatch(changeDaySelected(dayFormat));
        dispatch(setStepWorkoutModale(STEP_MODAL.EXERCISES));
        dispatch(setModaleWorkoutIsOpen(true));
    };

    return (
        <div
            className={`${styles.wrapper} ${currentDayClass} ${dayNotThisMonth} ${daySelectedClass}`}
            onClick={dayClickHandler}
        >
            <div className={styles.dayHeader}>
                {row === 0 && <span className={styles.dayWeek}>{day.format('dd').toUpperCase()}</span>}
                <span className={styles.number}>{day.format('DD')}</span>
            </div>
            <div className={styles.workoutList}>
                {workoutsForTheDay.map(({ id, workoutName }) => (
                    <div
                        key={id}
                        className={`${styles.workout} ${workoutSelected(id)}`}
                        onMouseDown={() => workoutOnClick(id)}
                    >
                        {workoutName}
                    </div>
                ))}
            </div>
        </div>
    );
};
