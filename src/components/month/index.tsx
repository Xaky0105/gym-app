import React, { memo, useMemo } from 'react';
import type { Dayjs } from 'dayjs';

import { Day } from '@/components/day';
import { useAppSelector } from '@/hooks/redux-hook';
import { selectMonthIndex } from '@/store/month/selectors';
import { selectWorkoutsForCalendar } from '@/store/workout-on-calendar/selectors';
import { getMonthMatrix } from '@/utils/dayjs';
import { getWorkoutsForMonth } from '@/utils/workout';

import styles from './index.module.scss';

export const Month = memo(() => {
    const monthIndex = useAppSelector(selectMonthIndex);
    const workoutsForCalendar = useAppSelector(selectWorkoutsForCalendar);

    const currentMonth = useMemo(() => getMonthMatrix(monthIndex), [monthIndex]);

    const workoutsForMonth = useMemo(
        () => getWorkoutsForMonth(workoutsForCalendar, monthIndex),
        [workoutsForCalendar, monthIndex],
    );

    return (
        <div className={styles.wrapper}>
            {currentMonth.map((row: Dayjs[], i: number) => (
                <React.Fragment key={i}>
                    {row.map((day: Dayjs, index: number) => (
                        <Day
                            day={day}
                            key={index}
                            row={i}
                            workoutsForMonth={workoutsForMonth}
                            monthIndex={monthIndex}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
});
