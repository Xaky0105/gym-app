import { FC } from 'react';
import { Exercise } from '../../types/workout';
import Tooltip from '@mui/material/Tooltip';
import { MdClose } from 'react-icons/md';
import styles from './index.module.scss';

type ExerciseListPropsType = {
    exerciseList: Exercise[];
    onClickHandler: (exercise: Exercise) => void;
};

export const ExerciseList: FC<ExerciseListPropsType> = ({ exerciseList, onClickHandler }) => {
    return (
        <ul className={styles.exerciseList}>
            {exerciseList.map((exercise) => (
                <li key={exercise.id} className={styles.exercise}>
                    <p className={styles.name}>{exercise.name}</p>
                    <div className={styles.settingsBlock}>
                        <Tooltip title="Удалить" disableInteractive enterDelay={500}>
                            <div className={styles.itemWrapper} onClick={() => onClickHandler(exercise)}>
                                <MdClose className={styles.settingItem} />
                            </div>
                        </Tooltip>
                    </div>
                </li>
            ))}
        </ul>
    );
};
