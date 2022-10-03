import {FC} from 'react'
import { useAppSelector } from '../../../hooks/redux-hook'
import styles from './index.module.scss'

type RightSideTypeProps = {
    workoutId: string | null
}

const RightSide:FC<RightSideTypeProps> = ({ workoutId }) => {
    const workouts = useAppSelector(state => state.workout.userWorkouts)
    const exercises = workoutId && workouts[workoutId].exercises
    return (
        <div className={styles.rightSide}>
            <h2 className={styles.title}>Упражнения</h2>
            <ul className={styles.exerciseList}>
                {exercises && exercises.map((exercise) => (
                    <li key={exercise.id} className={styles.exerciseItem}>
                        {exercise.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RightSide