import { FC, useMemo, useRef } from 'react';
import cnBind from 'classnames/bind';
import { Dayjs } from 'dayjs';

import { CalendarPopup } from '@/compound/calendar-popup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectSelectedDay, selectTempIdWorkout } from '@/store/modal/selectors';
import { DAY_FORMAT, STEP_MODAL } from '@/types/other';
import { WorkoutOnCalendar } from '@/types/workout';
import { getCurrentDay, getMonthIndexFromDate, getMonthIndexFromZeroToEleven } from '@/utils/dayjs';
import { getWorkoutForTheDay } from '@/utils/workout';
import Slide from '@mui/material/Slide';

import { WorkoutContentModal } from '../modals/workout-content';

import styles from './index.module.scss';
import { closeWorkoutModal, openWorkoutModal } from '@/store/modal/slice';

interface DayProps {
    day: Dayjs;
    row: number;
    workoutsForMonth: WorkoutOnCalendar[];
    monthIndex: number;
}

const cx = cnBind.bind(styles);

export const Day: FC<DayProps> = ({ day, row, workoutsForMonth, monthIndex }) => {
    const dispatch = useAppDispatch();

    const selectedWorkoutId = useAppSelector(selectTempIdWorkout);
    const daySelected = useAppSelector(selectSelectedDay);

    const dayRef = useRef<HTMLDivElement>(null);

    const formattedDate = day.format(DAY_FORMAT.YYYY_MM_DD);
    const isDayNotThisMonth = day.month() !== getMonthIndexFromZeroToEleven(monthIndex);

    const workoutsForTheDay = useMemo(() => {
        return getWorkoutForTheDay(formattedDate, workoutsForMonth);
    }, [workoutsForMonth]);

    const clickHandler = (type: 'workout' | 'day', id?: string) => {
        if (isDayNotThisMonth) {
            return;
        }

        if (type === 'workout') {
            dispatch(
                openWorkoutModal({ step: STEP_MODAL.EXERCISES, selectedWorkoutId: id, selectedDay: formattedDate }),
            );
        }
        if (type === 'day') {
            dispatch(openWorkoutModal({ step: STEP_MODAL.WORKOUTS, selectedDay: formattedDate }));
        }
    };

    const isSelectedDay = daySelected === formattedDate;
    const dayClasses = cx('wrapper', {
        currentDay: formattedDate === getCurrentDay(),
        dayOfTheLastMonth: isDayNotThisMonth,
        daySelect: isSelectedDay,
    });

    const workoutClasses = (id: string) =>
        cx('workout', {
            disabled: getMonthIndexFromDate(formattedDate) !== getMonthIndexFromZeroToEleven(monthIndex),
            selectWorkout: selectedWorkoutId === id,
        });

    return (
        <>
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

            <CalendarPopup anchorRef={dayRef} isOpen={isSelectedDay} onClose={() => dispatch(closeWorkoutModal())}>
                <WorkoutContentModal />
            </CalendarPopup>
        </>
    );
};
