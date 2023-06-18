import { memo } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import { ButtonOutline } from '@/components/buttons/button-outline';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectMonthIndex } from '@/store/month/selectors';
import { decMonthIndex, incMonthIndex, resetMonthIndex } from '@/store/month/slice';
import { STEP_MODAL } from '@/types/other';
import { getCurrentDay, getYear } from '@/utils/dayjs';

import styles from './index.module.scss';
import { openWorkoutModal } from '@/store/modal/slice';

export const CalendarHeader = memo(() => {
    const dispatch = useAppDispatch();
    const monthIndex = useAppSelector(selectMonthIndex);

    const workoutForDayClickHandler = () => {
        dispatch(openWorkoutModal({ step: STEP_MODAL.WORKOUTS, selectedDay: getCurrentDay() }));
    };
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperGroupBtn}>
                    <div className={styles.btnWrapper} onMouseDown={() => dispatch(resetMonthIndex())}>
                        <ButtonOutline text="Тренировка на сегодня" handleClick={workoutForDayClickHandler} />
                    </div>
                </div>
                <div className={styles.wrapperGroupBtn}>
                    <div className={styles.btnWrapper}>
                        <ButtonOutline text="Сегодня" handleClick={() => dispatch(resetMonthIndex())} />
                    </div>
                    <button className={styles.btn} onClick={() => dispatch(decMonthIndex())}>
                        <MdArrowBackIosNew />
                    </button>
                    <button className={styles.btn} onClick={() => dispatch(incMonthIndex())}>
                        <MdArrowForwardIos />
                    </button>
                    <h3 className={styles.data}>{getYear(monthIndex)}</h3>
                </div>
            </div>
        </>
    );
});
