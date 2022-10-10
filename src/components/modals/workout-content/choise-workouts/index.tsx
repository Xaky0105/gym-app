import { FC, useState } from 'react'
import { STEP_MODAL } from '../'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hook'
import { setStepWorkoutModale, toggleModale } from '../../../../store/modaleSlice'
import { getSelectedDay, getWorkouts } from '../../../../store/selectors'
import { MdArrowBack } from 'react-icons/md';
import { Workout } from '../../../../types/workout'
import { generateWorkout } from '../../../../utils/workout';
import { addWorkoutToCalendarAsync } from '../../../../store/actions/asyncAction'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../../types/route'
import styles from './index.module.scss'

export const ChoiseWorkouts:FC = () => {
    const [selectWorkout, setSelectWorkout] = useState<Workout | null>(null)
    // const [howToRepeat, setHowToRepeat] = useState('Не повторять')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userWorkout = useAppSelector(getWorkouts)
    const daySelected = useAppSelector(getSelectedDay)

    const userWorkoutArr = _.toArray(userWorkout)
    
    const workoutClickHandler = (workout: Workout) => {
        setSelectWorkout(workout)
    }

    const addWorkoutOnCalendar = () => {
        const workout = generateWorkout(daySelected, selectWorkout as Workout)
        dispatch(addWorkoutToCalendarAsync(workout))
        dispatch(toggleModale())
    }

    const createWorkoutClickHandler = () => {
        navigate(ROUTE_PATH.CREATE_WORKOUT)
        dispatch(toggleModale())
    }

    const activeWorkoutClass = (workout: Workout) => {
        return _.isEqual(workout, selectWorkout) ? `${styles.activeWorkout}` : ''
    }

    return (
        <div className={styles.content}>
            <span 
                className={styles.back} 
                onClick={() => dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS))}
            >
                <MdArrowBack size={20}/>
            </span>
            <h3 className={styles.title}>Выберите тренировку из списка</h3>

            <div className={styles.workoutList}>
                {userWorkoutArr.map((workout) => (
                    <div 
                        onClick={() => workoutClickHandler(workout)}
                        className={`${styles.workoutItem} ${activeWorkoutClass(workout)}`}
                        key={workout.id}
                    >
                        <span className={styles.workoutName}>{workout.workoutName}</span>
                    </div>
                ))}
            </div>
            {_.isEmpty(userWorkout) 
                ?
                <div className={styles.btn}>
                    <span className={styles.btnChild}  onClick={() => createWorkoutClickHandler()}>Создать тренировку</span>
                </div> 
                :
                <div className={styles.btn}>
                    <span onClick={() => addWorkoutOnCalendar()} className={styles.btnChild}>Добавить</span>
                </div>
            }
        </div>
    )
}