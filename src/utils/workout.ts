import dayjs from 'dayjs';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { DAY_FORMAT } from '@/types/day';
import { ExerciseInWorkoutOnCalendar, HOW_TO_REPEAT, UserWorkoutsStateType, WorkoutOnCalendar } from '@/types/workout';

import { convertDateToNumber, getMonthIndexFromDate, getMonthIndexFromZeroToEleven } from './dayjs';

type GenerateWorkout = (daySelected: string, workout: WorkoutOnCalendar) => WorkoutOnCalendar;
type GetWorkoutsIdToDelete = (workoutsOnTheCalendar: UserWorkoutsStateType, id: string) => string[];

export const generateWorkout: GenerateWorkout = (daySelected, workout) => {
    const arrExercise = _.toArray(workout.exercises) as ExerciseInWorkoutOnCalendar[];
    const exercises: { [k: string]: ExerciseInWorkoutOnCalendar } = {};
    arrExercise.forEach((ex) => {
        exercises[ex.id] = {
            ...ex,
            sets: [{ amount: 0, weight: 0 }],
        };
    });
    const workoutData: WorkoutOnCalendar = {
        ...workout,
        date: daySelected,
        addingTime: dayjs().format(),
        id: uuidv4(),
        exercises,
    };
    return workoutData;
};

export const generateArrWorkoutsForCalendar = (workout: WorkoutOnCalendar, workoutDates: string[]) => {
    return workoutDates.map((date) => {
        return {
            ...workout,
            id: uuidv4(),
            date,
            addingTime: dayjs().format(),
        };
    });
};

export const getArrWorkoutsIdToDelete: GetWorkoutsIdToDelete = (workoutsOnTheCalendar, id) => {
    const selectWorkout = workoutsOnTheCalendar[id];
    const selectWorkoutDate = convertDateToNumber(selectWorkout.date!);
    return _.toArray(workoutsOnTheCalendar)
        .filter((workout: WorkoutOnCalendar) => {
            const workoutDate = convertDateToNumber(workout.date!);
            return workoutDate >= selectWorkoutDate && workout.workoutName === selectWorkout.workoutName;
        })
        .map((filtredWorkout) => filtredWorkout.id);
};

export const getWorkoutsDates = (type: HOW_TO_REPEAT, workout: WorkoutOnCalendar, repeatInterval?: number) => {
    const workoutDate = workout.date;
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

export const getWorkoutsForMonth = (workouts: UserWorkoutsStateType, monthIndex: number) => {
    return _.toArray(workouts).filter(
        (workout) => getMonthIndexFromDate(workout.date!) === getMonthIndexFromZeroToEleven(monthIndex),
    );
};

export const getWorkoutForTheDay = (date: string, workoutsForMonth: WorkoutOnCalendar[]) => {
    const filtredWorkout = workoutsForMonth.filter((workout) => workout.date === date);
    return sortWorkoutByAddingTime(filtredWorkout);
};

export const sortWorkoutByAddingTime = (workout: WorkoutOnCalendar[]) => {
    return workout.sort((a, b) => dayjs(a.addingTime).valueOf() - dayjs(b.addingTime).valueOf());
};
