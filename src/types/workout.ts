export interface BasicExercise {
    id: string;
    name: string;
    category: string;
}

export interface ExerciseInWorkout extends BasicExercise {
    order: number;
}

export interface ExerciseInWorkoutOnCalendar extends ExerciseInWorkout {
    sets: SetsType[];
    date: string;
}

export type SetsType = {
    weight: number;
    amount: number;
    index?: number;
};
export interface Workout {
    workoutName: string;
    id: string;
    color: string;
    exercises: {
        [key: string]: ExerciseInWorkout;
    };
}

export interface WorkoutOnCalendar extends Workout {
    date: string;
    addingTime: string;
    exercises: {
        [key: string]: ExerciseInWorkoutOnCalendar;
    };
}

export type ExerciseListType = {
    [key: string]: ExerciseInWorkoutOnCalendar[];
};

export type UserWorkoutsStateType = {
    [key: string]: WorkoutOnCalendar;
};

export enum DELETE_WORKOUT_FROM_CALENDAR {
    ONLY_ONE = 'ONLY_ONE',
    THIS_AND_NEXT = 'THIS_AND_NEXT',
}
export enum HOW_TO_REPEAT {
    DONT_REPEAT = 'DONT_REPEAT',
    ONCE_A_WEEK = 'ONCE_A_WEEK',
    INTERVAL = 'INTERVAL',
    EVERY_DAY = 'EVERY_DAY',
}

export enum HOW_TO_CHANGE_EXERCISE {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export enum EXERCISE_CATEGORY {
    legs = 'Ноги',
    arms = 'Руки',
    back = 'Спина',
    shoulders = 'Плечи',
    breast = 'Грудь',
    core = 'Пресс',
}
