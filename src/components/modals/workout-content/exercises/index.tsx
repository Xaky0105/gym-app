import cnBind from 'classnames/bind';
import _ from 'lodash';
import { MdArrowBack } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectWorkoutById } from '@/store/workout-on-calendar/selectors';
import { STEP_MODAL } from '@/types/other';
import { ExerciseInWorkoutOnCalendar } from '@/types/workout';
import { getSortedExerciseByPosition } from '@/utils/exercise';

import styles from './index.module.scss';
import { openWorkoutModal } from '@/store/modal/slice';

const cx = cnBind.bind(styles);

export const Exercises = () => {
    const dispatch = useAppDispatch();
    const workout = useAppSelector(selectWorkoutById);

    if (!workout) {
        return null;
    }

    const exercises = workout.exercises;
    const workoutName = workout.workoutName;

    const sortByExerciseNumber = getSortedExerciseByPosition(exercises);
    const exerciseClickHandler = (id: string) => {
        dispatch(openWorkoutModal({ step: STEP_MODAL.SETS, selectedExerciseId: id }));
    };

    const cn = (ex: ExerciseInWorkoutOnCalendar) =>
        cx('item', {
            complete: ex.sets.every((set) => set.amount && set.weight),
            partly:
                ex.sets.some((set) => set.amount || set.weight) && !ex.sets.every((set) => set.amount && set.weight),
        });
    return (
        <div className={styles.content}>
            <span className={styles.back} onClick={() => dispatch(openWorkoutModal({ step: STEP_MODAL.WORKOUTS }))}>
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
