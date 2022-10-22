import { FC } from 'react';
import { ExerciseAccordion } from './accordion';
import { Right } from '../../../compound/container-two-part/right';
import { ExerciseInWorkout } from '../../../types/workout';
import styles from './index.module.scss';

type RightSideType = {
    temporaryExercise: ExerciseInWorkout[];
    setTemporaryExerciseHandler: (exercise: ExerciseInWorkout) => void;
};

export const RightSide: FC<RightSideType> = ({ temporaryExercise, setTemporaryExerciseHandler }) => {
    return (
        <Right title="Список упражнений">
            <div className={styles.block}>
                <div className={styles.content}>
                    <ExerciseAccordion
                        temporaryExercise={temporaryExercise}
                        setTemporaryExerciseHandler={setTemporaryExerciseHandler}
                    />
                </div>
            </div>
        </Right>
    );
};
