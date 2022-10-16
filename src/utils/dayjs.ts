import dayjs from "dayjs";
import ruLocale from'dayjs/locale/ru'
import weekday from 'dayjs/plugin/weekday' // Для установки дня недели в соответсвии с локалью
import { DAY_FORMAT } from "../types/day";
import { HOW_TO_REPEAT, Workout } from "../types/workout";

dayjs.extend(weekday)

export const getMonthMatrix = (month = dayjs().month()) => {
    const year = dayjs().locale(ruLocale).year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).locale(ruLocale).weekday()
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount)).locale(ruLocale)
        })
    })
    return daysMatrix
}

export const getYear = (monthIndex: number): string => {
    return dayjs(new Date(dayjs().year(), monthIndex)).locale(ruLocale).format('MMMM YYYY')
        .replace(/[a-zа-я]+/gi, (match) => match[0].toUpperCase()+match.substr(1))
}

export const getCurrentDay = () => {
    return dayjs().locale(ruLocale).format(DAY_FORMAT.YYYY_MM_DD)
}

export const getWorkoutsDates = (type: HOW_TO_REPEAT, workout: Workout, repeatInterval?: number) => {
    const workoutDate = workout.date!
    const dateArr: string[] = []
    const limit = 20214000000 // Примерно пол года. Потом сделать точное время
    if (type === HOW_TO_REPEAT.ONCE_A_WEEK) {
        const weeks = 30
        for (let i = 0; i < weeks; i++) {
            dateArr.push(dayjs(workoutDate).add(i , 'week').format(DAY_FORMAT.YYYY_MM_DD))
        } 
    } else if (type === HOW_TO_REPEAT.INTERVAL) {
        let diff = 0
        let day = 0
        while (diff < limit) {
            const lastDate = dateArr[dateArr.length - 1]
            const firstDate = dateArr[0]
            diff = dayjs(lastDate).diff(dayjs(firstDate))
            dateArr.push(dayjs(workoutDate).add(day , 'day').format(DAY_FORMAT.YYYY_MM_DD))
            day = day + (repeatInterval! + 1)
        }
    }
    return dateArr
}

export const daysNotIncludedInCurrentMonth = (monthIndex: number) => {
    return dayjs().month(monthIndex).month()
}