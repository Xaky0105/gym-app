import { FC } from 'react';
import { ExerciseInWorkout } from '../../../../../types/workout';
import Tooltip from '@mui/material/Tooltip';
import { MdClose } from 'react-icons/md';
import styles from './index.module.scss';

type ExerciseListPropsType = {
    temporaryExercise: ExerciseInWorkout[];
    setTemporaryExerciseHandler: (exercise: ExerciseInWorkout) => void;
};

export const ExerciseList: FC<ExerciseListPropsType> = ({ temporaryExercise, setTemporaryExerciseHandler }) => {
    return (
        <ul className={styles.exerciseList}>
            {temporaryExercise.map((exercise, i) => (
                <li key={exercise.id} className={styles.exercise}>
                    <p className={styles.name}>
                        {exercise.position}. {exercise.name}
                    </p>
                    <div className={styles.settingsBlock}>
                        <Tooltip title="Удалить" disableInteractive enterDelay={500}>
                            <div className={styles.itemWrapper} onClick={() => setTemporaryExerciseHandler(exercise)}>
                                <MdClose className={styles.settingItem} />
                            </div>
                        </Tooltip>
                    </div>
                </li>
            ))}
        </ul>
    );
};
