import { FC, memo } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { ButtonOutline } from '@/components/buttons/button-outline';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { changeDaySelected, setModalWorkoutIsOpen, setStepWorkoutModal } from '@/store/modal/slice';
import { selectMonthIndex } from '@/store/month/selectors';
import { decMonthIndex, incMonthIndex, resetMonthIndex } from '@/store/month/slice';
import { selectWorkoutCalendarError } from '@/store/workout-on-calendar/selectors';
import { STEP_MODAL } from '@/types/modal';
import { getCurrentDay, getYear } from '@/utils/dayjs';
import Alert from '@mui/material/Alert';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import styles from './index.module.scss';

export const CalendarHeader: FC = memo(() => {
    console.log('render');
    const dispatch = useAppDispatch();
    const monthIndex = useAppSelector(selectMonthIndex);
    const error = useAppSelector(selectWorkoutCalendarError);
    const buttonClickHandler = (reducer: ActionCreatorWithoutPayload<string>) => {
        dispatch(reducer());
    };
    const workoutForDayClickHandler = () => {
        dispatch(changeDaySelected(getCurrentDay()));
        dispatch(setStepWorkoutModal(STEP_MODAL.WORKOUTS));
        dispatch(setModalWorkoutIsOpen(true));
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperGroupBtn}>
                    <div className={styles.btnWrapper}>
                        <ButtonOutline text="Тренировка на сегодня" handleClick={workoutForDayClickHandler} />
                    </div>
                </div>
                <div className={styles.wrapperGroupBtn}>
                    <div className={styles.btnWrapper}>
                        <ButtonOutline text="Сегодня" handleClick={() => buttonClickHandler(resetMonthIndex)} />
                    </div>
                    <div className={styles.arrowWrapper} onClick={() => buttonClickHandler(decMonthIndex)}>
                        <MdArrowBackIosNew />
                    </div>
                    <div className={styles.arrowWrapper} onClick={() => buttonClickHandler(incMonthIndex)}>
                        <MdArrowForwardIos />
                    </div>
                    <h3 className={styles.data}>{getYear(monthIndex)}</h3>
                </div>
            </div>
            {error && (
                <Alert
                    severity="error"
                    sx={{
                        position: 'absolute',
                        width: '70%',
                        left: '50%',
                        top: '10%',
                        translate: '-50%',
                    }}
                >
                    {error}
                </Alert>
            )}
        </>
    );
});
