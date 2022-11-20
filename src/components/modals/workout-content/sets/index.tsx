import { FC } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { MdArrowBack } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectExerciseById } from '@/store/exercises/selectors';
import { setStepWorkoutModal } from '@/store/modal/slice';
import { updateExerciseInWorkoutOnCalendarAsync } from '@/store/workout-on-calendar/asyncActions';
import { STEP_MODAL } from '@/types/other';
import Tooltip from '@mui/material/Tooltip';

import { Set } from './set';

import styles from './index.module.scss';

export const Sets: FC = () => {
    const dispatch = useAppDispatch();

    const selectExercise = useAppSelector(selectExerciseById);

    const addSet = () => {
        const updateExercise = {
            ...selectExercise,
            sets: [...selectExercise.sets!, { amount: 0, weight: 0 }],
        };
        dispatch(updateExerciseInWorkoutOnCalendarAsync(updateExercise));
    };
    const removeSet = (setIndex: number) => {
        if (selectExercise.sets.length > 1) {
            const newSets = selectExercise.sets.filter((_, i) => i !== setIndex);
            const exercise = {
                ...selectExercise,
                sets: newSets,
            };
            dispatch(updateExerciseInWorkoutOnCalendarAsync(exercise));
        }
    };
    return (
        <div className={styles.content}>
            <div className={styles.block}>
                <span className={styles.back} onClick={() => dispatch(setStepWorkoutModal(STEP_MODAL.EXERCISES))}>
                    <MdArrowBack size={20} />
                </span>
                <h3 className={styles.title}>{selectExercise.name}</h3>
                <ul className={styles.list}>
                    {selectExercise.sets.map((set, index) => (
                        <Set set={set} index={index} key={index} removeSet={removeSet} />
                    ))}
                </ul>
            </div>
            <div className={styles.addSetBtn}>
                <Tooltip title={'Добавить подход'} disableInteractive enterDelay={500} leaveDelay={200}>
                    <span onClick={addSet}>
                        <BsPlusSquareDotted size={30} />
                    </span>
                </Tooltip>
            </div>
        </div>
    );
};
