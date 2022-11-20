import { FC } from 'react';
import cnBind from 'classnames/bind';
import _ from 'lodash';
import { MdArrowBack } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { setStepWorkoutModal, setTempIdExercise } from '@/store/modal/slice';
import { selectWorkoutById } from '@/store/workout-on-calendar/selectors';
import { STEP_MODAL } from '@/types/other';
import { ExerciseInWorkoutOnCalendar } from '@/types/workout';
import { getSortedExerciseByPosition } from '@/utils/exercise';

import styles from './index.module.scss';

const cx = cnBind.bind(styles);

export const Exercises: FC = () => {
    const dispatch = useAppDispatch();
    const { exercises, workoutName } = useAppSelector(selectWorkoutById);
    const sortByExerciseNumber = getSortedExerciseByPosition(exercises);
    const exerciseClickHandler = (id: string) => {
        dispatch(setStepWorkoutModal(STEP_MODAL.SETS));
        dispatch(setTempIdExercise(id));
    };

    const cn = (ex: ExerciseInWorkoutOnCalendar) =>
        cx('item', {
            complete: ex.sets.every((set) => set.amount && set.weight),
            partly:
                ex.sets.some((set) => set.amount || set.weight) && !ex.sets.every((set) => set.amount && set.weight),
        });
    return (
        <div className={styles.content}>
            <span className={styles.back} onClick={() => dispatch(setStepWorkoutModal(STEP_MODAL.WORKOUTS))}>
                <MdArrowBack size={20} />
            </span>
            <h3 className={styles.title}>{workoutName}</h3>
            <ul>
                {sortByExerciseNumber.map((ex) => (
                    <li key={ex.id} onClick={() => exerciseClickHandler(ex.id)} className={cn(ex)}>
                        {ex.order}. {ex.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
