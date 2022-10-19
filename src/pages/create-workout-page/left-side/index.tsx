import { FC } from 'react';
import { Exercise } from '../../../types/workout';
import { Form } from '../form';
import styles from './index.module.scss';

type LeftSideType = {
    temporaryExercise: Exercise[];
    togglerTemporaryExercise: (exercise: Exercise) => void;
    clearTemporaryExercise: () => void;
    editableWorkoutId: string;
};

export const LeftSide: FC<LeftSideType> = ({
    temporaryExercise,
    togglerTemporaryExercise,
    clearTemporaryExercise,
    editableWorkoutId,
}) => {
    return (
        <div className={styles.leftSide}>
            <h2 className={styles.title}>Моя тренировка</h2>
            <Form
                temporaryExercise={temporaryExercise}
                togglerTemporaryExercise={togglerTemporaryExercise}
                clearTemporaryExercise={clearTemporaryExercise}
                editableWorkoutId={editableWorkoutId}
            />
        </div>
    );
};
