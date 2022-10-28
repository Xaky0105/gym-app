import { FC } from 'react';

import { CalendarHeader } from '@/components/calendar-header';
import { WorkoutContentModale } from '@/components/modals/workout-content';
import { Month } from '@/components/month';
import { CalendarPopup } from '@/compound/calendar-popup';
import { Container } from '@/compound/container';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { getIsOpenModalWorkout } from '@/store/selectors';
import { setModaleWorkoutIsOpen } from '@/store/slices/modaleSlice';

export const CalendarPage: FC = () => {
    const dispatch = useAppDispatch();
    const isOpenModalWorkout = useAppSelector(getIsOpenModalWorkout);
    const onCloseWorkoutModal = () => {
        dispatch(setModaleWorkoutIsOpen(false));
    };
    return (
        <Container>
            <CalendarHeader />
            <Month />
            <CalendarPopup isOpen={isOpenModalWorkout} onClose={onCloseWorkoutModal}>
                <WorkoutContentModale />
            </CalendarPopup>
        </Container>
    );
};
