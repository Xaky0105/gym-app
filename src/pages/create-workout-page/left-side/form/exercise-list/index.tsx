import { FC, useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { TransitionGroup } from 'react-transition-group';

import { Context } from '@/pages/create-workout-page';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';

import styles from './index.module.scss';

export const ExerciseList: FC = () => {
    const { temporaryExercise, setTemporaryExerciseHandler } = useContext(Context);
    return (
        <ul className={styles.exerciseList}>
            <TransitionGroup>
                {temporaryExercise.map((exercise) => (
                    <Slide key={exercise.id} direction="right" mountOnEnter unmountOnExit>
                        <li className={styles.exercise}>
                            <p className={styles.name}>
                                {exercise.order}. {exercise.name}
                            </p>
                            <div className={styles.settingsBlock}>
                                <Tooltip title="Удалить" disableInteractive enterDelay={500}>
                                    <div
                                        className={styles.itemWrapper}
                                        onClick={() => setTemporaryExerciseHandler(exercise)}
                                    >
                                        <MdClose className={styles.settingItem} />
                                    </div>
                                </Tooltip>
                            </div>
                        </li>
                    </Slide>
                ))}
            </TransitionGroup>
        </ul>
    );
};
