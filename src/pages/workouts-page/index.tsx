import { FC, useState } from 'react'
import { Container } from '../../compound/container'
import { RightSide } from './right-side';
import { LeftSide } from './left-side';
import styles from './index.module.scss'

export const WorkoutsPage:FC = () => {
    const [workoutId, setWorkoutId] = useState<string | null>(null)
    const setWorkoutClickHandler = (id: string | null) => {
        setWorkoutId(id)
    }
    return (
        <Container>
            <div className={styles.wrapper}>
                <LeftSide setWorkoutClickHandler={setWorkoutClickHandler}/>
                <RightSide workoutId={workoutId}/>
            </div>
        </Container>
    )
}