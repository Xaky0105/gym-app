import { FC } from 'react';
import { ExerciseAccordion } from '../../../components/exercise-accordion';
import { Exercise } from '../../../types/workout';
import styles from './index.module.scss';

type RightSideType = {
    temporaryExercise: Exercise[];
    togglerTemporaryExercise: (exercise: Exercise) => void;
};

export const RightSide: FC<RightSideType> = ({ temporaryExercise, togglerTemporaryExercise }) => {
    return (
        <div className={styles.rightSide}>
            <h2 className={styles.title}>Список упражнений</h2>
            <div className={styles.block}>
                <div className={styles.content}>
                    <ExerciseAccordion
                        temporaryExercise={temporaryExercise}
                        togglerTemporaryExercise={togglerTemporaryExercise}
                    />
                </div>
            </div>
        </div>
    );
};
