import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBemjSjRIWptTIgaVhCYcX9P14_YsxKglM',
    authDomain: 'gym-app-7d5d6.firebaseapp.com',
    projectId: 'gym-app-7d5d6',
    storageBucket: 'gym-app-7d5d6.appspot.com',
    messagingSenderId: '372260334599',
    appId: '1:372260334599:web:4a8c4b0ffc31664f23cea2',
    measurementId: 'G-PWD7EGRVHN',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
