import { FC, RefObject, useCallback, useRef, useState } from 'react';

import { CalendarHeader } from '@/components/calendar-header';
import { WorkoutContentModal } from '@/components/modals/workout-content';
import { Month } from '@/components/month';
import { CalendarPopup } from '@/compound/calendar-popup';
import { Container } from '@/compound/container';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectIsOpenModalWorkout } from '@/store/modal/selectors';
import { setModalWorkoutIsOpen } from '@/store/modal/slice';

export const CalendarPage: FC = () => {
    const dispatch = useAppDispatch();
    const isOpenModalWorkout = useAppSelector(selectIsOpenModalWorkout);

    const [currentDayRef, setCurrentDayRef] = useState<RefObject<any> | null>(null);

    const monthRef = useRef<RefObject<any> | null>(null);

    const changeDayRef = (ref: RefObject<any>) => {
        setCurrentDayRef(ref);
    };

    const onCloseWorkoutModal = () => {
        dispatch(setModalWorkoutIsOpen(false));
    };
    const changeDayRefCallback = useCallback(changeDayRef, []);
    return (
        <Container>
            <CalendarHeader changeDayRef={changeDayRefCallback} />
            <Month changeDayRef={changeDayRefCallback} monthRef={monthRef} />
            <CalendarPopup
                isOpen={isOpenModalWorkout}
                onClose={onCloseWorkoutModal}
                currentDayRef={currentDayRef}
                monthRef={monthRef}
            >
                <WorkoutContentModal />
            </CalendarPopup>
        </Container>
    );
};
