export type Exercise = {
    id: string
    name: string
    category: string
    sets?: SetsType[]
}
export type SetsType = {
    weight: number,
    amount: number,
    index?: number
}
export type Workout = {
    workoutName: string
    id: string
    date?: string
    exercises: {
        [key: string]: Exercise
    }
}
export type ExerciseListType = {
    [key: string]: Exercise[]
}
export type UserWorkoutsStateType = {
    [key: string]: Workout
}

export enum DELETE_WORKOUT_FROM_CALENDAR {
    ONLY_ONE = 'ONLY_ONE',
    THIS_AND_NEXT = 'THIS_AND_NEXT'
}
export enum HOW_TO_REPEAT {
    DONT_REPEAT = 'DONT_REPEAT',
    ONCE_A_WEEK = 'ONCE_A_WEEK',
    INTERVAL = "INTERVAL",
    EVERY_DAY = 'EVERY_DAY'
}