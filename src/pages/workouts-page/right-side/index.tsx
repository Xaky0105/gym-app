import { FC } from 'react';
import _ from 'lodash';

import { Right } from '@/compound/container-two-part/right';
import { useAppSelector } from '@/hooks/redux-hook';
import { getWorkouts } from '@/store/selectors';
import { getSortedExerciseByPosition } from '@/utils/exercise';

import styles from './index.module.scss';

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
                        {exercise.order}. {exercise.name}
                    </li>
                ))}
            </ul>
        </Right>
    );
};
