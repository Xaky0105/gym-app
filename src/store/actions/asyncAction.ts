import { Exercise, ExerciseListType } from './../../types/workout';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, collection, query, getDocs, updateDoc, deleteDoc, DocumentData, QuerySnapshot } from "firebase/firestore";
import { setErrorUser, setIsLoadingUser, removeUser, setUser } from "../userSlice";
import { Workout } from "../../types/workout";
import { 
    addOrEditUserWorkout, 
    updateExercise, 
    addWorkoutToCalendar, 
    deleteUserWorkout, 
    exerciseListFetchComplete, 
    setIsLoadingWorkout, 
    workoutsFetchComplete, 
    workoutsToCalendarFetchComplete, 
    deleteWorkoutFromCalendar
} from "../workoutSlice";


const USER_AUTH_CONFIG = {
    register: createUserWithEmailAndPassword,
    signin: signInWithEmailAndPassword,
};

const getCurrentUserId = (getState: any) => {
    const {
        user: {
            user: { uid },
        }
    } = getState();
    return uid
}

export const getExercisesListFromBD = () => {
    return async (dispatch: any) => {
        // const exerciseListDoc = doc(db, `initExerciseList/91294612946102461410460`);
        // await setDoc(exerciseListDoc, exerciseList)
        const exerciseListCollectionRef = collection(db, `initExerciseList`);
        const exerciseListQuery = query(exerciseListCollectionRef);
        const exerciseListCollectionData = await getDocs(exerciseListQuery)

        if (exerciseListCollectionData.size) {
            let initExerciseList: ExerciseListType = {};
            exerciseListCollectionData.forEach((exerciseCategory) => {
                initExerciseList = exerciseCategory.data()
            });
            dispatch(exerciseListFetchComplete(initExerciseList));
        } else {
            dispatch(exerciseListFetchComplete({}));
        }
    }
}

export const userAuth = (email: string, password: string, type: 'signin' | 'register') => {
    return (dispatch: any) => {  

        dispatch(setIsLoadingUser(true)) 

        USER_AUTH_CONFIG[type](auth, email, password)
            .then(({user}) => {
                const userCopy = JSON.parse(JSON.stringify(user)) // делаю копию юзера, потому что toolkit ругается на то что объект не сериализуемый
                dispatch(setUser({
                    user: userCopy
                }))
                dispatch(setIsLoadingUser(false))
                return user
            })
            .then((user) => {
                console.log(user)
                return setDoc(doc(db, "users", user.uid), {
                    id: user.uid,
                });
            })
            .catch((err) => {
                dispatch(setErrorUser(err.message))
                setTimeout(() => {
                    dispatch(setErrorUser(null))
                }, 1500)
            })
    }
}

export const userSignOut = () => {
    return (dispatch: any) => {
        auth.signOut()
        dispatch(removeUser())
    }
}


export const createOrEditWorkout = (workout: Workout, type: 'edit' | 'create') => {
    return (dispatch: any, getState: any) => {
        const uid = getCurrentUserId(getState)
    
        const userWorkoutDoc = doc(db, `users/${uid}/workouts/${workout.id}`);

        if (type === 'create') {
            setDoc(userWorkoutDoc, workout);
        } else {
            updateDoc(userWorkoutDoc, workout);
        }
        dispatch(addOrEditUserWorkout(workout));
    };
};

export const deleteWorkout = (id: string) => {
    return (dispatch: any, getState: any) => {
        const uid = getCurrentUserId(getState)

        const userWorkoutsDoc = doc(db, `users/${uid}/workouts/${id}`);
        deleteDoc(userWorkoutsDoc)
        dispatch(deleteUserWorkout(id))
    }
}

export const loadWorkouts = () => {
    return async (dispatch: any, getState: any) => {
        dispatch(setIsLoadingWorkout(true))

        const uid = getCurrentUserId(getState)

        const userWorkoutsCollectionReference = collection(db, `users/${uid}/workouts`);
        const userWorkoutsOnCalendarCollectionRef = collection(db, `users/${uid}/workoutsOnCalendar`);

        const workoutsQuery = query(userWorkoutsCollectionReference);
        const workoutsOnCalendarQuery = query(userWorkoutsOnCalendarCollectionRef);

        const workoutsCollectionData = await getDocs(workoutsQuery);
        const workoutsOnCalendarCollectionData = await getDocs(workoutsOnCalendarQuery)

        const formationWorkouts = (data: QuerySnapshot<DocumentData>) => {
            type WorkoutType = {
                [key: string]: object
            }
            const workouts: WorkoutType = {}
            data.forEach((workout) => {
                workouts[workout.id] = workout.data()
            })
            return workouts
        }

        if (workoutsCollectionData.size) {
            const workouts = formationWorkouts(workoutsCollectionData)
            dispatch(workoutsFetchComplete(workouts))
        } else {
            dispatch(workoutsFetchComplete({}))
        }

        if (workoutsOnCalendarCollectionData.size) {
            const workoutsOnCalendar = formationWorkouts(workoutsOnCalendarCollectionData)
            dispatch(workoutsToCalendarFetchComplete(workoutsOnCalendar))
        } else {
            dispatch(workoutsToCalendarFetchComplete({}))
        }

        dispatch(setIsLoadingWorkout(false))
    }
}


export const addWorkoutToCalendarAsync = (workout: Workout) => {
    return (dispatch: any, getState: any) => {
        const uid = getCurrentUserId(getState)
    
        const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${workout.id}`);
        setDoc(userWorkoutDoc, workout);

        dispatch(addWorkoutToCalendar(workout));
    };
};

export const deleteWorkoutFromCalendarAsync = (id: string) => {
    return (dispatch: any, getState: any) => {
        const uid = getCurrentUserId(getState)
    
        const userWorkoutDoc = doc(db, `users/${uid}/workoutsOnCalendar/${id}`);
        deleteDoc(userWorkoutDoc);

        dispatch(deleteWorkoutFromCalendar(id));
    };
};

export const updateExerciseAsync = (exercise: Exercise) => {
    return async (dispatch: any, getState: any) => {
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
        const userWorkoutRef = doc(db, `users/${uid}/workoutsOnCalendar/${idSelectedWorkout}`);

        updateDoc(userWorkoutRef, {
            [field]: exercise
        });
        
        dispatch(updateExercise({
            exercise, 
            idSelectedExercise, 
            idSelectedWorkout
        }))
    }
}



