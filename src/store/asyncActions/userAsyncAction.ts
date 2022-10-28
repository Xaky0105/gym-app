import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import _ from 'lodash';

import { basicExerciseList } from '@/constants/constant';
import { auth, db, provider } from '@/firebase';
import { removeUser, setErrorUser, setIsLoadingUser, setUser } from '@/store/slices/userSlice';
import { uuidv4 } from '@firebase/util';
import { Dispatch } from '@reduxjs/toolkit';

const USER_AUTH_CONFIG = {
    register: createUserWithEmailAndPassword,
    signin: signInWithEmailAndPassword,
};

export const userAuth = (email: string, password: string, type: 'signin' | 'register', name?: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoadingUser(true));
        try {
            await setPersistence(auth, browserLocalPersistence);
            const user = (await USER_AUTH_CONFIG[type](auth, email, password)).user;
            if (type === 'register') {
                await updateProfile(user, {
                    displayName: name,
                });
                dispatch(setUser({ user: { ...user, displayName: name } }));
                const userExerciseListDoc = doc(db, `users/${user.uid}/exerciseList/${uuidv4()}`);
                await setDoc(userExerciseListDoc, basicExerciseList); // При регистрации добавляю юзеру базовый список упражнений
            } else if (type === 'signin') {
                dispatch(setUser({ user }));
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
