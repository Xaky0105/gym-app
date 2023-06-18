import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import _ from 'lodash';

import { db } from '@/firebase';
import { removeExercise, setNewExercise, updateExercise } from '@/store/exercises/slice';
import { BasicExercise, EXERCISE_CATEGORY } from '@/types/workout';
import { HOW_TO_CHANGE_EXERCISE } from '@/types/workout';
import { getCategoryExercise } from '@/utils/exercise';
import { getCurrentUserId } from '@/utils/user';

import { createAppThunk } from '../utils/thunk';

import { ExerciseDataThunk } from './types';

export const changeExerciseAsync = createAppThunk(
    'exercise/changeExercise',
    async (exerciseData: ExerciseDataThunk, { getState, dispatch }) => {
        const { exercise, howToChange } = exerciseData;
        const uid = getCurrentUserId(getState);
        const {
            exercise: { exerciseList },
        } = getState();
        const category = getCategoryExercise(exercise.category as EXERCISE_CATEGORY);
        try {
            const exerciseListDoc = await getDocs(query(collection(db, `users/${uid}/exerciseList`)));
            const listId = exerciseListDoc.docs.reduce((acc, data) => (acc = data.id), '');
            const userExerciseListRef = doc(db, `users/${uid}/exerciseList/${listId}`);
            switch (howToChange) {
                case HOW_TO_CHANGE_EXERCISE.CREATE:
                    updateDoc(userExerciseListRef, {
                        [category]: arrayUnion(exercise),
                    });
                    dispatch(setNewExercise({ exercise, category }));
                    return;
                case HOW_TO_CHANGE_EXERCISE.DELETE:
                    updateDoc(userExerciseListRef, {
                        [category]: arrayRemove(exercise),
                    });
                    dispatch(removeExercise({ exercise, category }));
                    return;
                case HOW_TO_CHANGE_EXERCISE.UPDATE:
                    const updatedExerciseCategory: BasicExercise[] = exerciseList[category].map((ex: BasicExercise) =>
                        ex.id === exercise.id ? exercise : ex,
                    );
                    updateDoc(userExerciseListRef, {
                        [category]: updatedExerciseCategory,
                    });
                    dispatch(updateExercise({ updatedExerciseCategory, category }));
                    return;
            }
        } catch ({ message }) {
            console.log(message);
        }
    },
);
