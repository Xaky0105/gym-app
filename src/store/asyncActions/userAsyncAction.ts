import { basicExerciseList } from '../../constants/constant';
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { auth, db, provider } from '../../firebase';
import { doc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { setErrorUser, setIsLoadingUser, removeUser, setUser } from '../slices/userSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { uuidv4 } from '@firebase/util';
import _ from 'lodash';

const USER_AUTH_CONFIG = {
    register: createUserWithEmailAndPassword,
    signin: signInWithEmailAndPassword,
};

export const userAuth = (email: string, password: string, type: 'signin' | 'register') => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoadingUser(true));
        try {
            await setPersistence(auth, browserLocalPersistence);
            const user = (await USER_AUTH_CONFIG[type](auth, email, password)).user;
            dispatch(setUser({ user }));
            if (type === 'register') {
                const userExerciseListDoc = doc(db, `users/${user.uid}/exerciseList/${uuidv4()}`);
                await setDoc(userExerciseListDoc, basicExerciseList); // При регистрации добавляю юзеру базовый список упражнений
            }
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
            await setPersistence(auth, browserLocalPersistence);
            const user = (await signInWithPopup(auth, provider)).user;
            dispatch(setUser({ user }));

            const exerciseListCollectionData = await getDocs(query(collection(db, `users/${user.uid}/exerciseList`)));

            if (!exerciseListCollectionData.size) {
                const userExerciseListDoc = doc(db, `users/${user.uid}/exerciseList/${uuidv4()}`);
                await setDoc(userExerciseListDoc, basicExerciseList); // При регистрации добавляю юзеру базовый список упражнений
            }
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

export const autoSignIn = () => {
    return (dispatch: Dispatch) => {
        auth.onAuthStateChanged((user) => {
            dispatch(setUser({ user }));
        });
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
