import { FC } from 'react';
import _ from 'lodash';
import { useAppSelector } from '../../../hooks/redux-hook';
import { getWorkouts } from '../../../store/selectors';
import { Right } from '../../../compound/container-two-part/right';
import styles from './index.module.scss';
import { getSortedExerciseByPosition } from '../../../utils/exercise';

type RightSideTypeProps = {
    workoutId: string | null;
};

export const RightSide: FC<RightSideTypeProps> = ({ workoutId }) => {
    const workouts = useAppSelector(getWorkouts);
    const exercises = workoutId && workouts[workoutId].exercises;
    const sortedExerciseByPosition = exercises ? getSortedExerciseByPosition(exercises) : [];
    return (
        <Right title="Упражнения">
            <ul className={styles.exerciseList}>
                {sortedExerciseByPosition.map((exercise) => (
                    <li key={exercise.id} className={styles.exerciseItem}>
                        {exercise.position}. {exercise.name}
                    </li>
                ))}
            </ul>
        </Right>
    );
};
