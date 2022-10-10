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