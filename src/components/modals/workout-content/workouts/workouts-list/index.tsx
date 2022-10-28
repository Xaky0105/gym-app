import { FC } from 'react';
import _ from 'lodash';
import { AiOutlineCloseSquare } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { getSelectedDay, getWorkoutsForCalendar } from '@/store/selectors';
import { setStepWorkoutModale, setTempIdWorkout } from '@/store/slices/modaleSlice';
import { STEP_MODAL } from '@/types/modal';
import { getWorkoutForTheDay } from '@/utils/workout';

import styles from './index.module.scss';

type WorkoutListPropsType = {
    deleteWorkoutClickHandler: (workoutId: string) => void;
};

export const WorkoutsList: FC<WorkoutListPropsType> = ({ deleteWorkoutClickHandler }) => {
    const dispatch = useAppDispatch();
    const daySelected = useAppSelector(getSelectedDay);
    const workoutsOnCalendar = useAppSelector(getWorkoutsForCalendar);

    const workoutsOnCalendarArr = _.toArray(workoutsOnCalendar);

    const workoutsForTheDay = getWorkoutForTheDay(daySelected, workoutsOnCalendarArr);

    const workoutClickHandler = (id: string) => {
        dispatch(setStepWorkoutModale(STEP_MODAL.EXERCISES));
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
