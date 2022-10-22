import { basicExerciseList } from '../../constants/constant';
import { ExerciseListType } from '../../types/workout';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../../firebase';
import { doc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { setErrorUser, setIsLoadingUser, removeUser, setUser } from '../slices/userSlice';
import { exerciseListFetchComplete } from '../slices/workoutSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { uuidv4 } from '@firebase/util';
import _ from 'lodash';

const USER_AUTH_CONFIG = {
    register: createUserWithEmailAndPassword,
    signin: signInWithEmailAndPassword,
};

const getExercisesList = async (dispatch: Dispatch, uid: string) => {
    const exerciseListCollectionRef = collection(db, `users/${uid}/exerciseList`);
    const exerciseListQuery = query(exerciseListCollectionRef);
    const exerciseListCollectionData = await getDocs(exerciseListQuery);
    let initExerciseList: ExerciseListType = {};
    exerciseListCollectionData.forEach((exerciseCategory) => {
        initExerciseList = exerciseCategory.data();
    });
    dispatch(exerciseListFetchComplete(initExerciseList));
};

export const userAuth = (email: string, password: string, type: 'signin' | 'register') => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoadingUser(true));
        try {
            const user = (await USER_AUTH_CONFIG[type](auth, email, password)).user;
            const userCopy = JSON.parse(JSON.stringify(user)); // делаю копию юзера, потому что toolkit ругается на то что объект не сериализуемый
            dispatch(
                setUser({
                    user: userCopy,
                }),
            );
            if (type === 'register') {
                const userExerciseListDoc = doc(db, `users/${user.uid}/exerciseList/${uuidv4()}`);
                await setDoc(userExerciseListDoc, basicExerciseList); // При регистрации добавляю юзеру базовый список упражнений
            }
            await getExercisesList(dispatch, user.uid);
            dispatch(setIsLoadingUser(false));
        } catch ({ message }) {
            if (typeof message === 'string') {
                dispatch(setErrorUser(message));
                _.delay(() => dispatch(setErrorUser(null)), 1500);
            }
        }
    };
};

export const loginWithGoogle = () => {
    return async (dispatch: Dispatch) => {
        try {
            const user = (await signInWithPopup(auth, provider)).user;
            const userCopy = JSON.parse(JSON.stringify(user)); // делаю копию юзера, потому что toolkit ругается на то что объект не сериализуемый
            dispatch(
                setUser({
                    user: userCopy,
                }),
            );
            const exerciseListCollectionRef = collection(db, `users/${user.uid}/exerciseList`);
            const exerciseListQuery = query(exerciseListCollectionRef);
            const exerciseListCollectionData = await getDocs(exerciseListQuery);

            if (!exerciseListCollectionData.size) {
                const userExerciseListDoc = doc(db, `users/${user.uid}/exerciseList/${uuidv4()}`);
                await setDoc(userExerciseListDoc, basicExerciseList); // При регистрации добавляю юзеру базовый список упражнений
            }

            await getExercisesList(dispatch, user.uid);
            dispatch(setIsLoadingUser(false));
        } catch ({ message }) {
            if (typeof message === 'string') {
                dispatch(setErrorUser(message));
                _.delay(() => dispatch(setErrorUser(null)), 1500);
            } else {
                console.log(message);
            }
        }
    };
};

export const userSignOut = () => {
    return async (dispatch: Dispatch) => {
        try {
            auth.signOut();
            dispatch(removeUser());
        } catch ({ message }) {
            if (typeof message === 'string') {
                dispatch(setErrorUser(message));
                _.delay(() => dispatch(setErrorUser(null)), 1500);
            } else {
                console.log(message);
            }
        }
    };
};
