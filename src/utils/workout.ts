import dayjs from 'dayjs';
import { Workout, Exercise, UserWorkoutsStateType, HOW_TO_REPEAT } from './../types/workout';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { getMonthIndexFromDate, getMonthIndexFromZeroToEleven } from './dayjs';
import { DAY_FORMAT } from '../types/day';

type GenerateWorkout = (daySelected: string, workout: Workout) => Workout;
type GetWorkoutsIdToDelete = (workoutsOnTheCalendar: UserWorkoutsStateType, id: string) => string[];
type GenerateArrWorkoutsForCalendars = (workout: Workout, workoutDates: string[]) => Workout[];
type ConvertWorkoutDateToNumber = (workoutDate: string) => number;

export const generateWorkout: GenerateWorkout = (daySelected, workout) => {
    const arrExercise = _.toArray(workout.exercises);
    const exercises: { [k: string]: Exercise } = {};
    arrExercise.forEach((ex) => {
        exercises[ex.id] = {
            ...ex,
            sets: [{ amount: 0, weight: 0 }],
        };
    });
    const workoutData: Workout = {
        ...workout,
        date: daySelected,
        id: uuidv4(),
        exercises,
    };
    return workoutData;
};

export const generateArrWorkoutsForCalendar: GenerateArrWorkoutsForCalendars = (workout, workoutDates) => {
    return workoutDates.map((date) => ({ ...workout, id: uuidv4(), date }));
};

export const convertWorkoutDateToNumber: ConvertWorkoutDateToNumber = (workoutDate) => {
    const splitDate = workoutDate.split('-');
    const [year, month, day] = splitDate;
    return new Date().setFullYear(+year, +month, +day);
};

export const getArrWorkoutsIdToDelete: GetWorkoutsIdToDelete = (workoutsOnTheCalendar, id) => {
    const selectWorkout = workoutsOnTheCalendar[id];
    const selectWorkoutDate = convertWorkoutDateToNumber(selectWorkout.date!);
    return _.toArray(workoutsOnTheCalendar)
        .filter((workout: Workout) => {
            const workoutDate = convertWorkoutDateToNumber(workout.date!);
            return workoutDate >= selectWorkoutDate && workout.workoutName === selectWorkout.workoutName;
        })
        .map((filtredWorkout) => filtredWorkout.id);
};

export const getWorkoutsDates = (type: HOW_TO_REPEAT, workout: Workout, repeatInterval?: number) => {
    const workoutDate = workout.date!;
    const dateArr: string[] = [];
    const limit = 2419200000; // Примерно месяц. Потом сделать точное время
    if (type === HOW_TO_REPEAT.ONCE_A_WEEK) {
        const weeks = 30;
        for (let i = 0; i < weeks; i++) {
            dateArr.push(dayjs(workoutDate).add(i, 'week').format(DAY_FORMAT.YYYY_MM_DD));
        }
    } else if (type === HOW_TO_REPEAT.INTERVAL) {
        let diff = 0;
        let day = 0;
        while (diff < limit) {
            const lastDate = dateArr[dateArr.length - 1];
            const firstDate = dateArr[0];
            diff = dayjs(lastDate).diff(dayjs(firstDate));
            dateArr.push(dayjs(workoutDate).add(day, 'day').format(DAY_FORMAT.YYYY_MM_DD));
            day = day + (repeatInterval! + 1);
        }
    }
    return dateArr;
};

export const getWorkoutsForMonth = (workouts: { [key: string]: Workout }, monthIndex: number) => {
    return _.toArray(workouts).filter(
        (workout) => getMonthIndexFromDate(workout.date!) === getMonthIndexFromZeroToEleven(monthIndex),
    );
};
