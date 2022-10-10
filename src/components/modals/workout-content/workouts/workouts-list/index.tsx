import { FC } from 'react'
import { STEP_MODAL } from '../..'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux-hook'
import { setStepWorkoutModale, setTempIdWorkout } from '../../../../../store/modaleSlice'
import { getSelectedDay, getWorkoutsFromCalendar } from '../../../../../store/selectors'
import { AiOutlineCloseSquare } from 'react-icons/ai';
import _ from 'lodash'
import styles from './index.module.scss'
import { deleteWorkoutFromCalendarAsync } from '../../../../../store/actions/asyncAction'

export const WorkoutsList:FC = () => {
    const dispatch = useAppDispatch()
    const daySelected = useAppSelector(getSelectedDay)
    const workoutsOnCalendar = useAppSelector(getWorkoutsFromCalendar)

    const workoutsForTheDay = _.toArray(workoutsOnCalendar).filter((workout) => workout.date === daySelected)

    const workoutClickHandler = (id: string) => {
        dispatch(setStepWorkoutModale(STEP_MODAL.EXERCISES))
        dispatch(setTempIdWorkout(id))
    }

    const deleteWorkoutClickHandler = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(deleteWorkoutFromCalendarAsync(id))
    }

    return (
        <div className={styles.list}>
            {
                workoutsForTheDay.length !== 0
                ?
                <ul>
                    {workoutsForTheDay.map((workout) => (
                        <li 
                            key={workout.id}
                            onClick={() => workoutClickHandler(workout.id)}
                            className={styles.item}
                        >
                            <span className={styles.itemText}>{workout.workoutName}</span>
                            <span className={styles.crossWrapper}>
                                <AiOutlineCloseSquare 
                                    size={16}
                                    onClick={deleteWorkoutClickHandler(workout.id)}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
                :
                <p>Нет активных тренировок</p>
            }
        </div>
    )
}