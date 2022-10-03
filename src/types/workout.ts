export type Exercise = {
    id: string
    name: string
    category: string
    sets?: Sets[]
}
export type Sets = {
    weight: number,
    amount: number,
    index?: number
}
export type Workout = {
    workoutName: string
    id: string
    date?: string
    exercises: Exercise[]
}