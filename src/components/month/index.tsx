import { type Dayjs } from 'dayjs'
import React from 'react'
import { Day } from '../day'
import styles from './index.module.scss'

interface MonthProps {
    month: Dayjs[][]
}

export const Month: React.FC<MonthProps> = ({month}) => {
    return (
        <div className={styles.wrapper}>
            {month.map((row: any[], i: number) => (
                <React.Fragment key={i}>
                    {row.map((day: Dayjs, index: number) => (
                        <Day day={day} key={index} row={i}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}