import { FC } from 'react';
import _ from 'lodash';
import { AiOutlineCloseSquare } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectSelectedDay } from '@/store/modal/selectors';
import { selectWorkoutsForCalendar } from '@/store/workout-on-calendar/selectors';
import { STEP_MODAL } from '@/types/other';
import { getWorkoutForTheDay } from '@/utils/workout';

import styles from './index.module.scss';
import { openWorkoutModal } from '@/store/modal/slice';

type WorkoutListPropsType = {
    deleteWorkoutClickHandler: (workoutId: string) => void;
};

export const WorkoutsList: FC<WorkoutListPropsType> = ({ deleteWorkoutClickHandler }) => {
    const dispatch = useAppDispatch();
    const daySelected = useAppSelector(selectSelectedDay);
    const workoutsOnCalendar = useAppSelector(selectWorkoutsForCalendar);

    const workoutsOnCalendarArr = _.toArray(workoutsOnCalendar);

    const workoutsForTheDay = daySelected ? getWorkoutForTheDay(daySelected, workoutsOnCalendarArr) : undefined;

    const workoutClickHandler = (id: string) => {
        dispatch(openWorkoutModal({ step: STEP_MODAL.EXERCISES, selectedExerciseId: id }));
    };

    return (
        <div className={styles.list}>
            {!workoutsForTheDay || _.isEmpty(workoutsForTheDay) ? (
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
