import { type Dayjs } from 'dayjs';
import React, { memo } from 'react';
import { Workout } from '../../types/workout';
import { Day } from '../day';
import styles from './index.module.scss';

interface MonthProps {
    month: Dayjs[][];
    workoutsForMonth: Workout[];
}

export const Month: React.FC<MonthProps> = memo(({ month, workoutsForMonth }) => {
    console.log('render');
    return (
        <div className={styles.wrapper}>
            {month.map((row: Dayjs[], i: number) => (
                <React.Fragment key={i}>
                    {row.map((day: Dayjs, index: number) => (
                        <Day day={day} key={index} row={i} workoutsForMonth={workoutsForMonth} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
});
