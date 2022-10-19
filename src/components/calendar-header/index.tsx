import { FC, memo } from 'react';
import { ButtonOutline } from '../buttons/button-outline';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { resetMonthIndex, decMonthIndex, incMonthIndex } from '../../store/slices/monthSlice';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { getCurrentDay, getYear } from '../../utils/dayjs';
import { getMonthIndex, getWorkoutCalendarError } from '../../store/selectors';
import { changeDaySelected } from '../../store/slices/modaleSlice';
import { setStepWorkoutModale, setModaleWorkoutIsOpen } from '../../store/slices/modaleSlice';
import { STEP_MODAL } from '../modals/workout-content';
import Alert from '@mui/material/Alert';
import styles from './index.module.scss';

export const CalendarHeader: FC = memo(() => {
    console.log('render');
    const dispatch = useAppDispatch();
    const monthIndex = useAppSelector(getMonthIndex);
    const error = useAppSelector(getWorkoutCalendarError);
    const buttonClickHandler = (reducer: ActionCreatorWithoutPayload<string>) => {
        dispatch(reducer());
    };
    const workoutForDayClickHandler = () => {
        dispatch(changeDaySelected(getCurrentDay()));
        dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS));
        dispatch(setModaleWorkoutIsOpen(true));
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperGroupBtn}>
                    <ButtonOutline text="Тренировка на сегодня" handleClick={workoutForDayClickHandler} />
                </div>
                <div className={styles.wrapperGroupBtn}>
                    <ButtonOutline text="Сегодня" handleClick={() => buttonClickHandler(resetMonthIndex)} />
                    <div className={styles.btnWrapper} onClick={() => buttonClickHandler(decMonthIndex)}>
                        <MdArrowBackIosNew />
                    </div>
                    <div className={styles.btnWrapper} onClick={() => buttonClickHandler(incMonthIndex)}>
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
