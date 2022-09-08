import dayjs from "dayjs";
import ruLocale from'dayjs/locale/ru'
import weekday from 'dayjs/plugin/weekday' // Для установки дня недели в соответсвии с локалью

dayjs.extend(weekday)

export const getMonth = (month = dayjs().month()) => {
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
    return dayjs().locale(ruLocale).format('DD/MM/YYYY')
}