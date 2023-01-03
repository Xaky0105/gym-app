import { FC } from 'react';
import _ from 'lodash';

import { Left } from '@/compound/container-two-part/left';
import { ExerciseInWorkoutOnCalendar } from '@/types/workout';

import styles from './index.module.scss';

type LeftSideType = {
    exerciseWithData: ExerciseInWorkoutOnCalendar[][];
    selectedExerciseGroupClickHandler: (exercise: ExerciseInWorkoutOnCalendar[]) => void;
};

export const LeftSide: FC<LeftSideType> = ({ exerciseWithData, selectedExerciseGroupClickHandler }) => {
    return (
        <Left title="Список упражнений которые вы выполняли">
            <ul className={styles.list}>
                {_.isEmpty(exerciseWithData) ? (
                    <p>Вы не выполнили ни одного упражнения</p>
                ) : (
                    exerciseWithData.map((exerciseGroup, i) => (
                        <li
                            key={i}
                            onClick={() => selectedExerciseGroupClickHandler(exerciseGroup)}
                            className={styles.item}
                        >
                            {exerciseGroup[0].name}
                        </li>
                    ))
                )}
            </ul>
        </Left>
    );
};
