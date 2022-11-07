import { FC } from 'react';
import _ from 'lodash';
import { AiOutlineCloseSquare } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectSelectedDay } from '@/store/modal/selectors';
import { setStepWorkoutModal, setTempIdWorkout } from '@/store/modal/slice';
import { selectWorkoutsForCalendar } from '@/store/workout-on-calendar/selectors';
import { STEP_MODAL } from '@/types/modal';
import { getWorkoutForTheDay } from '@/utils/workout';

import styles from './index.module.scss';

type WorkoutListPropsType = {
    deleteWorkoutClickHandler: (workoutId: string) => void;
};

export const WorkoutsList: FC<WorkoutListPropsType> = ({ deleteWorkoutClickHandler }) => {
    const dispatch = useAppDispatch();
    const daySelected = useAppSelector(selectSelectedDay);
    const workoutsOnCalendar = useAppSelector(selectWorkoutsForCalendar);

    const workoutsOnCalendarArr = _.toArray(workoutsOnCalendar);

    const workoutsForTheDay = getWorkoutForTheDay(daySelected, workoutsOnCalendarArr);

    const workoutClickHandler = (id: string) => {
        dispatch(setStepWorkoutModal(STEP_MODAL.EXERCISES));
        dispatch(setTempIdWorkout(id));
    };

    return (
        <div className={styles.list}>
            {_.isEmpty(workoutsForTheDay) ? (
                <p>Нет активных тренировок</p>
            ) : (
                <ul>
                    {workoutsForTheDay.map((workout) => (
                        <li key={workout.id} onClick={() => workoutClickHandler(workout.id)} className={styles.item}>
                            <span className={styles.itemText}>{workout.workoutName}</span>
                            <span className={styles.crossWrapper}>
                                <AiOutlineCloseSquare
                                    size={16}
                                    onMouseDown={() => deleteWorkoutClickHandler(workout.id)}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
