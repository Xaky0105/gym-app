import { Workout, Exercise } from './../types/workout';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
// import { getArrFromObject } from './object';

type GenerateWorkout = ( daySelected: string, workout: Workout) => Workout

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