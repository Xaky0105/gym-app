import React from 'react';
import { useAppSelector } from '../../hooks/redux-hook'
import styles from './index.module.scss'
import { daysNotIncludedInCurrentMonth, getCurrentDay } from '../../utils/dayjs';
import { Dayjs } from 'dayjs';
import { getMonthIndex } from '../../store/selectors';

interface DayProps {
    day: Dayjs,
    row: number
}

const Day: React.FC<DayProps> = ({day, row}) => {
    const monthIndex = useAppSelector(getMonthIndex)

    const cn = () => {
        const currentDayClass = day.format('DD/MM/YYYY') === getCurrentDay() ? `${styles.currentDay}`: '' 
        const dayOfTheLastMonthClass = day.month() !== daysNotIncludedInCurrentMonth(monthIndex) ? `${styles.dayOfTheLastMonth}` : ''
        return `${styles.wrapper} + ${currentDayClass} + ${dayOfTheLastMonthClass}`
    }
    return (
        <div 
            className={cn()}
        >
            <div className={styles.dayHeader}>
                {row === 0 && <span className={styles.dayWeek}>{day.format('dd').toUpperCase()}</span>}
                <span className={styles.number}>
                    {day.format('DD')}
                </span>
            </div>
            
            <div className={styles.trainingList}>
    
            </div>
        </div>
    )
}

export default Day