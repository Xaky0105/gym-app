import React, { useEffect, useState } from 'react'
import { Container } from '../../compound/container'
import { useAppSelector } from '../../hooks/redux-hook'
import { getMonth } from '../../utils/dayjs'
import CalendarHeader from './calendar-header'
import Month from './month'

const CalendarPage:React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth()) // В стейте двумерный массив
    const monthIndex = useAppSelector(state => state.month.monthIndex)
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