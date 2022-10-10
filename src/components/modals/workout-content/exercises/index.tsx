import { FC } from 'react'
import { STEP_MODAL } from '..'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hook'
import { setStepWorkoutModale, setTempIdExercise } from '../../../../store/modaleSlice'
import { getWorkoutById } from '../../../../store/selectors'
import { MdArrowBack } from 'react-icons/md';
import _ from 'lodash'
import styles from './index.module.scss'

export const Exercises:FC = () => {
    const dispatch = useAppDispatch()
    const { exercises, workoutName } = useAppSelector(getWorkoutById)
    const exerciseClickHandler = (id: string) => {
        dispatch(setStepWorkoutModale(STEP_MODAL.SETS))
        dispatch(setTempIdExercise(id))
    }
    return (
        <div className={styles.content}>
            <span 
                className={styles.back} 
                onClick={() => dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS))}
            >
                <MdArrowBack size={20}/>
            </span>
            <h3 className={styles.title}>{workoutName}</h3>
            <ul>
                {_.toArray(exercises).map((ex) => (
                    <li 
                        key={ex.id}
                        onClick={() => exerciseClickHandler(ex.id)}
                    >
                        {ex.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}