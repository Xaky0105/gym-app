import dayjs from 'dayjs';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { DAY_FORMAT } from '@/types/other';
import { ExerciseInWorkoutOnCalendar, HOW_TO_REPEAT, UserWorkoutsStateType, WorkoutOnCalendar } from '@/types/workout';

import { convertDateToNumber, getMonthMatrix } from './dayjs';

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
        .map((filterWorkout) => filterWorkout.id);
};

export const getWorkoutsDates = (type: HOW_TO_REPEAT, workout: WorkoutOnCalendar, repeatInterval?: number) => {
    const workoutDate = workout.date;
    const dateArr: string[] = [];
    const limit = 15778800000; // Примерно пол года. Потом сделать точное время
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
    const result: WorkoutOnCalendar[] = [];
    const monthDate = dayjs().month(monthIndex);

    for (const key in workouts) {
        const workout = workouts[key];
        if (monthDate.isSame(dayjs(workout.date), 'month')) {
            result.push(workout);
        }
    }

    return result;
};

export const getWorkoutForTheDay = (date: string, workoutsForMonth: WorkoutOnCalendar[]) => {
    const filterWorkout = workoutsForMonth.filter((workout) => workout.date === date);
    return sortWorkoutByAddingTime(filterWorkout);
};

export const sortWorkoutByAddingTime = (workout: WorkoutOnCalendar[]) => {
    return workout.sort((a, b) => dayjs(a.addingTime).valueOf() - dayjs(b.addingTime).valueOf());
};
