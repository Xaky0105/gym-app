import { FC, useContext } from 'react';
import { MdClose } from 'react-icons/md';

import { Context } from '@/pages/create-workout-page';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import styles from './index.module.scss';

export const ExerciseList: FC = () => {
    const { temporaryExercise, setTemporaryExerciseHandler } = useContext(Context);
    return (
        <ul className={styles.exerciseList}>
            {temporaryExercise.map((exercise) => (
                <Zoom key={exercise.id} in={!!exercise}>
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
                </Zoom>
            ))}
        </ul>
    );
};
