import React, { useEffect, useState } from 'react'
import { Container } from '../../compound/container'
import { useAppSelector } from '../../hooks/redux-hook'
import { getMonth } from '../../utils/dayjs'
import Month from '../../components/month'
import CalendarHeader from '../../components/calendar-header'
import { getMonthIndex } from '../../store/selectors'

const CalendarPage:React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth()) // В стейте двумерный массив
    const monthIndex = useAppSelector(getMonthIndex)
    useEffect(() => {   
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])
    return (
        <Container>
            <CalendarHeader />
            <Month month={currentMonth}/>
        </Container>
            
    )
}

export default CalendarPage