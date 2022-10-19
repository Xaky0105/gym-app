import { FC, useEffect, useMemo, useState } from 'react';
import { Container } from '../../compound/container';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { getMonthMatrix } from '../../utils/dayjs';
import { Month } from '../../components/month';
import { CalendarHeader } from '../../components/calendar-header';
import { getIsOpenModalWorkout, getMonthIndex, getWorkoutsForCalendar } from '../../store/selectors';
import { getWorkoutsForMonth } from '../../utils/workout';
import { CalendarPopup } from '../../compound/calendar-popup';
import { WorkoutContentModale } from '../../components/modals/workout-content';
import { setModaleWorkoutIsOpen } from '../../store/slices/modaleSlice';

export const CalendarPage: FC = () => {
    const dispatch = useAppDispatch();

    const [currentMonth, setCurrentMonth] = useState(getMonthMatrix()); // В стейте двумерный массив

    const monthIndex = useAppSelector(getMonthIndex);
    const isOpenModalWorkout = useAppSelector(getIsOpenModalWorkout);
    const workoutsForCalendar = useAppSelector(getWorkoutsForCalendar);

    useEffect(() => {
        setCurrentMonth(getMonthMatrix(monthIndex));
    }, [monthIndex]);

    const onCloseWorkoutModal = () => {
        dispatch(setModaleWorkoutIsOpen(false));
    };

    const workoutsForMonth = useMemo(() => getWorkoutsForMonth(workoutsForCalendar, monthIndex), [monthIndex, workoutsForCalendar]);
    return (
        <Container>
            <CalendarHeader />
            <Month month={currentMonth} workoutsForMonth={workoutsForMonth} />
            <CalendarPopup isOpen={isOpenModalWorkout} onClose={onCloseWorkoutModal}>
                <WorkoutContentModale />
            </CalendarPopup>
        </Container>
    );
};
