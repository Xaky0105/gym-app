import { FC, RefObject, useMemo, useRef } from 'react';
import cnBind from 'classnames/bind';
import { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectSelectedDay, selectTempIdWorkout } from '@/store/modal/selectors';
import { changeDaySelected, setModalWorkoutIsOpen, setStepWorkoutModal, setTempIdWorkout } from '@/store/modal/slice';
import { DAY_FORMAT } from '@/types/day';
import { STEP_MODAL } from '@/types/modal';
import { WorkoutOnCalendar } from '@/types/workout';
import { getCurrentDay, getMonthIndexFromDate, getMonthIndexFromZeroToEleven } from '@/utils/dayjs';
import { getWorkoutForTheDay } from '@/utils/workout';
import Slide from '@mui/material/Slide';

import styles from './index.module.scss';

interface DayProps {
    day: Dayjs;
    row: number;
    workoutsForMonth: WorkoutOnCalendar[];
    monthIndex: number;
    changeDayRef: (ref: RefObject<any>) => void;
}

const cx = cnBind.bind(styles);

export const Day: FC<DayProps> = ({ day, row, workoutsForMonth, monthIndex, changeDayRef }) => {
    const dispatch = useAppDispatch();
    const selectedWorkoutId = useAppSelector(selectTempIdWorkout);
    const daySelected = useAppSelector(selectSelectedDay);

    const dayRef = useRef(null);

    const dayFormat = day.format(DAY_FORMAT.YYYY_MM_DD);
    const isDayNotThisMonth = day.month() !== getMonthIndexFromZeroToEleven(monthIndex);

    const workoutsForTheDay = useMemo(() => {
        return getWorkoutForTheDay(dayFormat, workoutsForMonth);
    }, [workoutsForMonth]);

    const clickHandler = (type: 'workout' | 'day', id?: string) => {
        if (!isDayNotThisMonth) {
            changeDayRef(dayRef);
            dispatch(changeDaySelected(dayFormat));
            dispatch(setModalWorkoutIsOpen(true));
            if (type === 'workout') {
                dispatch(setTempIdWorkout(id!));
                dispatch(setStepWorkoutModal(STEP_MODAL.EXERCISES));
            }
            if (type === 'day') {
                dispatch(setStepWorkoutModal(STEP_MODAL.WORKOUTS));
            }
        }
    };

    const dayClasses = cx('wrapper', {
        currentDay: dayFormat === getCurrentDay(),
        dayOfTheLastMonth: isDayNotThisMonth,
        daySelect: daySelected === dayFormat,
    });

    const workoutClasses = (id: string) =>
        cx('workout', {
            disabled: getMonthIndexFromDate(dayFormat) !== getMonthIndexFromZeroToEleven(monthIndex),
            selectWorkout: selectedWorkoutId === id,
        });

    return (
        <div className={dayClasses} onClick={() => clickHandler('day')} ref={dayRef}>
            <div className={styles.dayHeader}>
                {row === 0 && <span className={styles.dayWeek}>{day.format('dd').toUpperCase()}</span>}
                <span className={styles.number}>{day.format('DD')}</span>
            </div>
            <div className={styles.workoutList}>
                {workoutsForTheDay.map(({ id, workoutName, color }) => (
                    <Slide key={id} direction="right" in={!!workoutName} mountOnEnter unmountOnExit>
                        <div
                            style={{ backgroundColor: color }}
                            className={workoutClasses(id)}
                            onMouseDown={() => clickHandler('workout', id)}
                        >
                            {workoutName}
                        </div>
                    </Slide>
                ))}
            </div>
        </div>
    );
};
