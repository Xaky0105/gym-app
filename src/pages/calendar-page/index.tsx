import { FC } from 'react';

import { CalendarHeader } from '@/components/calendar-header';
import { WorkoutContentModale } from '@/components/modals/workout-content';
import { Month } from '@/components/month';
import { CalendarPopup } from '@/compound/calendar-popup';
import { Container } from '@/compound/container';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectIsOpenModalWorkout } from '@/store/modal/selectors';
import { setModalWorkoutIsOpen } from '@/store/modal/slice';

export const CalendarPage: FC = () => {
    const dispatch = useAppDispatch();
    const isOpenModalWorkout = useAppSelector(selectIsOpenModalWorkout);
    const onCloseWorkoutModal = () => {
        dispatch(setModalWorkoutIsOpen(false));
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
