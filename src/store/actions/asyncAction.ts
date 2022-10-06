import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, collection, query, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { setErrorUser, setIsLoadingUser, removeUser, setUser } from "../userSlice";
import { Workout } from "../../types/workout";
import { addOrEditUserWorkout, deleteUserWorkout, setIsLoadingWorkout, workoutsFetchComplete } from "../workoutSlice";

const USER_AUTH_CONFIG = {
    register: createUserWithEmailAndPassword,
    signin: signInWithEmailAndPassword,
};

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
        const {
            user: {
                user: { uid },
            }
        } = getState();
    
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
        const {
            user: {
                user: { uid },
            }
        } = getState();
        const userWorkoutsDoc = doc(db, `users/${uid}/workouts/${id}`);
        deleteDoc(userWorkoutsDoc)
        dispatch(deleteUserWorkout(id))
    }
}

export const loadWorkouts = () => {
    return async (dispatch: any, getState: any) => {
        dispatch(setIsLoadingWorkout(true))
        const {
            user: {
                user: { uid }
            }
        } = getState()
        const userWorkoutsCollectionReference = collection(db, `users/${uid}/workouts`);
        const workoutsQuery = query(userWorkoutsCollectionReference);
        const workoutsCollectionData = await getDocs(workoutsQuery);

        if (workoutsCollectionData.size) {
            type WorkoutsType = {
                [key: string]: object
            }
            const workouts: WorkoutsType = {}
            workoutsCollectionData.forEach((workout) => {
                workouts[workout.id] = workout.data()
            })
            dispatch(workoutsFetchComplete(workouts))
        } else {
            dispatch(workoutsFetchComplete({}))
        }
        dispatch(setIsLoadingWorkout(false))
    }
}




