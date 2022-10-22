import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { getMonthIndexFromZeroToEleven, getCurrentDay } from '../../utils/dayjs';
import { Dayjs } from 'dayjs';
import { getMonthIndex } from '../../store/selectors';
import { setStepWorkoutModale, setTempIdWorkout, setModaleWorkoutIsOpen } from '../../store/slices/modaleSlice';
import { changeDaySelected } from '../../store/slices/modaleSlice';
import { STEP_MODAL } from '../modals/workout-content';
import { DAY_FORMAT } from '../../types/day';
import { WorkoutOnCalendar } from '../../types/workout';
import styles from './index.module.scss';
import { getWorkoutForTheDay } from '../../utils/workout';

interface DayProps {
    day: Dayjs;
    row: number;
    workoutsForMonth: WorkoutOnCalendar[];
}

export const Day: FC<DayProps> = ({ day, row, workoutsForMonth }) => {
    const dispatch = useAppDispatch();
    const monthIndex = useAppSelector(getMonthIndex);
    const dayFormat = day.format(DAY_FORMAT.YYYY_MM_DD);

    const workoutsForTheDay = getWorkoutForTheDay(dayFormat, workoutsForMonth);

    const currentDayClass = dayFormat === getCurrentDay() ? `${styles.currentDay}` : '';
    const dayNotThisMonth =
        day.month() !== getMonthIndexFromZeroToEleven(monthIndex) ? `${styles.dayOfTheLastMonth}` : '';

    const dayClickHandler = () => {
        if (!dayNotThisMonth) {
            dispatch(changeDaySelected(dayFormat));
            dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS));
            dispatch(setModaleWorkoutIsOpen(true));
        }
    };

    const workoutOnClick = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setTempIdWorkout(id));
        dispatch(changeDaySelected(dayFormat));
        dispatch(setStepWorkoutModale(STEP_MODAL.EXERCISES));
        dispatch(setModaleWorkoutIsOpen(true));
    };

    return (
        <div className={`${styles.wrapper} ${currentDayClass} ${dayNotThisMonth}`} onClick={dayClickHandler}>
            <div className={styles.dayHeader}>
                {row === 0 && <span className={styles.dayWeek}>{day.format('dd').toUpperCase()}</span>}
                <span className={styles.number}>{day.format('DD')}</span>
            </div>
            <div className={styles.workoutList}>
                {workoutsForTheDay.map((workout) => (
                    <div key={workout.id} className={`${styles.workout}`} onClick={workoutOnClick(workout.id)}>
                        {workout.workoutName}
                    </div>
                ))}
            </div>
        </div>
    );
};
