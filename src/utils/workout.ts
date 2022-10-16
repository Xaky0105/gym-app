import { Workout, Exercise, UserWorkoutsStateType } from './../types/workout';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

type GenerateWorkout = ( daySelected: string, workout: Workout) => Workout
type GetWorkoutsIdToDelete = (workoutsOnTheCalendar: UserWorkoutsStateType, id: string) => string[]
type GenerateArrWorkoutsForCalendars = (workout: Workout, workoutDates: string[]) => Workout[]
type ConvertWorkoutDateToNumber = (workoutDate: string) => number

export const generateWorkout: GenerateWorkout = (daySelected, workout) => {
    const arrExercise = _.toArray(workout.exercises)
    const exercises: {[k: string]: Exercise} = {};
    arrExercise.forEach((ex) => { 
        exercises[ex.id] = {
            ...ex, 
            sets: [{amount: 0, weight: 0}]
        } 
    });
    const workoutData: Workout = {
        ...workout,
        date: daySelected,
        id: uuidv4(),
        exercises
    }
    return workoutData
}

export const generateArrWorkoutsForCalendars: GenerateArrWorkoutsForCalendars = (workout, workoutDates) => {
    return workoutDates.map((date) => ({...workout, id: uuidv4(), date}))
}

export const convertWorkoutDateToNumber: ConvertWorkoutDateToNumber = (workoutDate) => {
    const splitDate = workoutDate.split('-')
    const [ year, month, day ] = splitDate
    return new Date().setFullYear(+year, +month, +day)
}

export const getArrWorkoutsIdToDelete: GetWorkoutsIdToDelete = (workoutsOnTheCalendar, id) => {
    const selectWorkout = workoutsOnTheCalendar[id]
    const selectWorkoutDate = convertWorkoutDateToNumber(selectWorkout.date!)
    return _.toArray(workoutsOnTheCalendar)
        .filter((workout: Workout) => {
            const workoutDate = convertWorkoutDateToNumber(workout.date!)
            return (
                workoutDate >= selectWorkoutDate &&
                workout.workoutName === selectWorkout.workoutName
            )
        })
        .map((filtredWorkout) => filtredWorkout.id)
}
