import React, { memo, RefObject, useEffect, useState } from 'react';
import { type Dayjs } from 'dayjs';

import { Day } from '@/components/day';
import { useAppSelector } from '@/hooks/redux-hook';
import { selectMonthIndex } from '@/store/month/selectors';
import { selectWorkoutsForCalendar } from '@/store/workout-on-calendar/selectors';
import { getMonthMatrix } from '@/utils/dayjs';
import { getWorkoutsForMonth } from '@/utils/workout';

import styles from './index.module.scss';

type MonthType = {
    changeDayRef: (ref: RefObject<any>) => void;
    monthRef: RefObject<any> | null;
};

export const Month: React.FC<MonthType> = memo(({ changeDayRef, monthRef }) => {
    const [currentMonth, setCurrentMonth] = useState(getMonthMatrix());

    const monthIndex = useAppSelector(selectMonthIndex);
    const workoutsForCalendar = useAppSelector(selectWorkoutsForCalendar);

    useEffect(() => {
        setCurrentMonth(getMonthMatrix(monthIndex));
    }, [monthIndex]);

    const workoutsForMonth = getWorkoutsForMonth(workoutsForCalendar, monthIndex);

    return (
        <div className={styles.wrapper} ref={monthRef}>
            {currentMonth.map((row: Dayjs[], i: number) => (
                <React.Fragment key={i}>
                    {row.map((day: Dayjs, index: number) => (
                        <Day
                            day={day}
                            key={index}
                            row={i}
                            workoutsForMonth={workoutsForMonth}
                            monthIndex={monthIndex}
                            changeDayRef={changeDayRef}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
});
