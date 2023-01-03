import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    deleteUser,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { deleteObject, getBlob, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import _ from 'lodash';

import { basicExerciseList } from '@/constants/constant';
import { auth, db, provider, storage } from '@/firebase';
import { removeUser, setErrorUser, setIsLoadingUser, setUser, updateUserAvatar } from '@/store/user/slice';
import { EnqueueSnackbar } from '@/types/other';
import { uuidv4 } from '@firebase/util';
import { Dispatch } from '@reduxjs/toolkit';

import { RootState } from '..';

const USER_AUTH_CONFIG = {
    register: createUserWithEmailAndPassword,
    signIn: signInWithEmailAndPassword,
};

export const userAuth = (email: string, password: string, type: 'signIn' | 'register', name?: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoadingUser(true));
        try {
            await setPersistence(auth, browserLocalPersistence);
            const user = (await USER_AUTH_CONFIG[type](auth, email, password)).user;
            if (type === 'register') {
                const userExerciseListDoc = doc(db, `users/${user.uid}/exerciseList/${uuidv4()}`);
                await setDoc(userExerciseListDoc, basicExerciseList); // При регистрации добавляю юзеру базовый список упражнений

                const imageRef = ref(storage, `usersAvatar/${user.uid}`);
                const anonymImgRef = ref(storage, `usersAvatar/anonym.jpg`);
                const blob = await getBlob(anonymImgRef);
                const res = await uploadBytes(imageRef, blob); //Добавляю дефолтное фото нового пользователя
                const photoURL = await getDownloadURL(res.ref);

                await updateProfile(user, {
                    displayName: name,
                    photoURL,
                });
            }
            dispatch(setUser({ user }));
        } catch ({ message }) {
            console.log(message);
            if (typeof message === 'string') {
                dispatch(setErrorUser(message));
                _.delay(() => dispatch(setErrorUser(null)), 1500);
            }
        }
        dispatch(setIsLoadingUser(false));
    };
};

export const loginWithGoogle = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoadingUser(true));
        try {
            await setPersistence(auth, browserLocalPersistence);
            const user = (await signInWithPopup(auth, provider)).user;
            dispatch(setUser({ user }));

            const exerciseListCollectionData = await getDocs(query(collection(db, `users/${user.uid}/exerciseList`)));

            if (!exerciseListCollectionData.size) {
                const userExerciseListDoc = doc(db, `users/${user.uid}/exerciseList/${uuidv4()}`);
                await setDoc(userExerciseListDoc, basicExerciseList); // При регистрации добавляю юзеру базовый список упражнений
            }
        } catch ({ message }) {
            if (typeof message === 'string') {
                dispatch(setErrorUser(message));
                _.delay(() => dispatch(setErrorUser(null)), 1500);
            } else {
                console.log(message);
            }
        }
        dispatch(setIsLoadingUser(false));
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

export const uploadUserAvatar = (avatarImg: Blob, enqueueSnackbar: EnqueueSnackbar) => {
    return async (dispatch: Dispatch, getState: any) => {
        dispatch(setIsLoadingUser(true));
        const {
            user: { user },
        } = getState() as RootState;
        const currentPhotoURL = user!.photoURL;
        const currUser = auth.currentUser!;
        const imageRef = ref(storage, `usersAvatar/${currUser.uid}`);
        const prevImgRef = ref(storage, currentPhotoURL);

        try {
            await deleteObject(prevImgRef);
            const res = await uploadBytes(imageRef, avatarImg);
            const photoURL = await getDownloadURL(res.ref);
            await updateProfile(currUser, {
                photoURL,
            });
            dispatch(updateUserAvatar(photoURL));
            enqueueSnackbar('Фото профиля успешно обновлено', { variant: 'success' });
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Не удалось обновить фото профиля', { variant: 'error' });
        }

        dispatch(setIsLoadingUser(false));
    };
};

export const deleteUserFromApp = () => {
    return async (dispatch: Dispatch, getState: any) => {
        // const uid = getCurrentUserId(getState);
        dispatch(setIsLoadingUser(true));
        try {
            const currUser = auth.currentUser!;
            // const usersRef = doc(db, 'users', uid);
            await deleteUser(currUser);
            // await deleteDoc(usersRef);
            dispatch(removeUser());
        } catch (err) {
            console.log(err);
        }
        dispatch(setIsLoadingUser(false));
    };
};
