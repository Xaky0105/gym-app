import _ from 'lodash';

import { EXERCISE_CATEGORY, ExerciseInWorkoutOnCalendar, WorkoutOnCalendar } from '@/types/workout';

import { convertDateToNumber } from './dayjs';

export const getListOfCompletedExercise = (workouts: { [key: string]: WorkoutOnCalendar }) => {
    const workoutsArr = _.toArray(workouts);
    const exercisesWithData: { [key: string]: ExerciseInWorkoutOnCalendar[] } = {};
    workoutsArr.forEach((workout) => {
        const exerciseArr = _.toArray(workout.exercises) as ExerciseInWorkoutOnCalendar[];
        exerciseArr.forEach((exercise) => {
            const filterSets = exercise.sets.filter((set) => set.amount && set.weight);
            if (!_.isEmpty(filterSets)) {
                if (!exercisesWithData[exercise.id]) {
                    exercisesWithData[exercise.id] = [];
                }
                exercisesWithData[exercise.id].push({ ...exercise, date: workout.date, sets: filterSets });
            }
        });
    });
    return exercisesWithData;
};

export const getSortedExercisesByDate = (exercises: ExerciseInWorkoutOnCalendar[]) => {
    const sortedExercises = exercises.sort((a, b) => convertDateToNumber(b.date) - convertDateToNumber(a.date));
    return sortedExercises;
};

export const getSortedExerciseByPosition = (exercises: {
    [key: string]: ExerciseInWorkoutOnCalendar;
}): ExerciseInWorkoutOnCalendar[] => {
    return _.toArray(exercises).sort((a, b) => a.order - b.order);
};

export const getExerciseTonnage = (exercise: ExerciseInWorkoutOnCalendar) => {
    return (
        exercise.sets.reduce((acc, set) => {
            return (acc += set.amount * set.weight);
        }, 0) / 1000
    );
};

export const getCategoryExercise = (name: EXERCISE_CATEGORY) => {
    switch (name) {
        case EXERCISE_CATEGORY.arms:
            return 'arms';
        case EXERCISE_CATEGORY.back:
            return 'back';
        case EXERCISE_CATEGORY.breast:
            return 'breast';
        case EXERCISE_CATEGORY.legs:
            return 'legs';
        case EXERCISE_CATEGORY.shoulders:
            return 'shoulders';
        case EXERCISE_CATEGORY.core:
            return 'core';
    }
};
