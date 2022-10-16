import { FC, useEffect, useState } from 'react'
import { Container } from '../../compound/container'
import { useAppSelector } from '../../hooks/redux-hook'
import { getMonthMatrix } from '../../utils/dayjs'
import { Month } from '../../components/month'
import CalendarHeader from '../../components/calendar-header'
import { getMonthIndex } from '../../store/selectors'

export const CalendarPage:FC = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonthMatrix()) // В стейте двумерный массив
    const monthIndex = useAppSelector(getMonthIndex)
    useEffect(() => {   
        setCurrentMonth(getMonthMatrix(monthIndex))
    }, [monthIndex])
    return (
        <Container>
            <CalendarHeader />
            <Month month={currentMonth}/>
        </Container>
    )
}