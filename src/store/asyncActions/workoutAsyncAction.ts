import { DELETE_WORKOUT_FROM_CALENDAR, Exercise, HOW_TO_REPEAT, Workout } from '../../types/workout';
import { db } from "../../firebase";
import { doc, setDoc, collection, query, getDocs, updateDoc, deleteDoc, DocumentData, QuerySnapshot, writeBatch } from "firebase/firestore";
import { Dispatch } from '@reduxjs/toolkit';
import { generateArrWorkoutsForCalendars, getArrWorkoutsIdToDelete } from '../../utils/workout';
import { getWorkoutsDates } from '../../utils/dayjs';
import { RootState } from '..';
import { 
    addOrEditUserWorkout, 
    updateExercise, 
    addWorkoutToCalendar, 
    deleteUserWorkout,
    setIsLoadingWorkout, 
    workoutsFetchComplete, 
    workoutsToCalendarFetchComplete, 
    deleteWorkoutFromCalendar,
    deleteSomeWorkoutFromCalendar,
    addSomeWorkoutsToCalendar
} from "../slices/workoutSlice";

const getCurrentUserId = (getState: any) => {
    const {
        user: {
            user: { uid },
        }
    } = getState()
    return uid
}

export const createOrEditWorkout = (workout: Workout, type: 'edit' | 'create') => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const uid = getCurrentUserId(getState)
    
            const userWorkoutDoc = doc(db, `users/${uid}/workouts/${workout.id}`)

            if (type === 'create') {
                setDoc(userWorkoutDoc, workout)
            } else {
                updateDoc(userWorkoutDoc, workout)
            }
            dispatch(addOrEditUserWorkout(workout))
        } catch (err) {
            console.log(err)
        }
    };
};

export const deleteWorkout = (id: string) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const uid = getCurrentUserId(getState)
            const userWorkoutsDoc = doc(db, `users/${uid}/workouts/${id}`)
            deleteDoc(userWorkoutsDoc)
            dispatch(deleteUserWorkout(id))
        } catch (err) {
            console.log(err)
        }
    }
}

export const loadWorkouts = () => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            dispatch(setIsLoadingWorkout(true))
            const uid = getCurrentUserId(getState)
            const userWorkoutsCollectionReference = collection(db, `users/${uid}/workouts`)
            const userWorkoutsOnCalendarCollectionRef = collection(db, `users/${uid}/workoutsOnCalendar`)
            const workoutsQuery = query(userWorkoutsCollectionReference)
            const workoutsOnCalendarQuery = query(userWorkoutsOnCalendarCollectionRef)
            const workoutsCollectionData = await getDocs(workoutsQuery)
            const workoutsOnCalendarCollectionData = await getDocs(workoutsOnCalendarQuery)
            const formattingWorkoutsData = (data: QuerySnapshot<DocumentData>) => {
                type WorkoutType = {
                    [key: string]: object
                }
                const workouts: WorkoutType = {}
                data.forEach((workout) => {
                    workouts[workout.id] = workout.data()
                })
                return workouts
            }
            const setWorkoutsData = (collection: QuerySnapshot<DocumentData>, reducer: any) => {
                if (collection.size) {
                    const workouts = formattingWorkoutsData(collection)
                    dispatch(reducer(workouts))
                } else {
                    dispatch(reducer({}))
                }
            }
            setWorkoutsData(workoutsCollectionData, workoutsFetchComplete)
            setWorkoutsData(workoutsOnCalendarCollectionData, workoutsToCalendarFetchComplete)
            dispatch(setIsLoadingWorkout(false))
        } catch (err) {
            console.log(err)
        }
    }
}


export const addWorkoutToCalendarAsync = (workout: Workout, howToRepeat: HOW_TO_REPEAT, repeatInterval: number) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const uid = getCurrentUserId(getState)
            const setWorkoutsData = (howToRepeat: HOW_TO_REPEAT, workout: Workout, repeatInterval?: number) => {
                const workoutDates = getWorkoutsDates(howToRepeat, workout, repeatInterval)
                const workoutsArr = generateArrWorkoutsForCalendars(workout, workoutDates)
                const batch = writeBatch(db)
                workoutsArr.forEach((workout) => {
                    const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${workout.id}`)
                    batch.set(userWorkoutDoc, workout)
                })
                batch.commit()
                dispatch(addSomeWorkoutsToCalendar(workoutsArr)) 
            }
            switch (howToRepeat) {
                case HOW_TO_REPEAT.DONT_REPEAT:
                    const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${workout.id}`)
                    setDoc(userWorkoutDoc, workout)
                    dispatch(addWorkoutToCalendar(workout))
                    break
                case HOW_TO_REPEAT.ONCE_A_WEEK:
                    setWorkoutsData(HOW_TO_REPEAT.ONCE_A_WEEK, workout)
                    break
                case HOW_TO_REPEAT.INTERVAL:
                    setWorkoutsData(HOW_TO_REPEAT.INTERVAL, workout, repeatInterval)
                    break
                case HOW_TO_REPEAT.EVERY_DAY:
                    setWorkoutsData(HOW_TO_REPEAT.INTERVAL, workout, 0)
                    break
            }
        } catch (err) {
            console.log(err)
        }
    };
};

export const deleteWorkoutFromCalendarAsync = (id: string, type: DELETE_WORKOUT_FROM_CALENDAR) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const state = getState() as RootState
            const uid = getCurrentUserId(getState)
            if (type === DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE) {

                const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${id}`)
                deleteDoc(userWorkoutDoc)
                dispatch(deleteWorkoutFromCalendar(id))
            } else if (type === DELETE_WORKOUT_FROM_CALENDAR.THIS_AND_NEXT) {
                const { workout: { workoutsOnTheCalendar } } = state
                const arrIdToRemove = getArrWorkoutsIdToDelete(workoutsOnTheCalendar, id)
                dispatch(deleteSomeWorkoutFromCalendar(arrIdToRemove))
                const batch = writeBatch(db)
                arrIdToRemove.forEach((id) => {
                    const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${id}`)
                    batch.delete(userWorkoutDoc)
                })
                await batch.commit()
            }
        } catch (err) {
            console.log(err)
        }
    };
};

export const updateExerciseAsync = (exercise: Exercise) => {
    return async (dispatch: Dispatch, getState: any) => {
        try {
            const {
                user: {
                    user: { uid },
                },
                modal: {
                    idSelectedExercise,
                    idSelectedWorkout
                }
            } = getState();
            const field = `exercises.${idSelectedExercise}`
            const userWorkoutRef = doc(db, `users/${uid}/workoutsOnCalendar/${idSelectedWorkout}`)
            updateDoc(userWorkoutRef, {
                [field]: exercise
            }); 
            dispatch(updateExercise({
                exercise, 
                idSelectedExercise, 
                idSelectedWorkout
            }))
        } catch (err) {
            console.log(err)
        }
    }
}



