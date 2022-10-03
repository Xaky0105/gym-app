import React, { useState } from 'react'
import { Container } from '../../compound/container'
import styles from './index.module.scss'
import RightSide from './right-side';
import LeftSide from './left-side';

const WorkoutsPage:React.FC = () => {
    const [workoutId, setWorkoutId] = useState<string | null>(null)
    const setWorkoutClickHandler = (id: string | null) => {
        setWorkoutId(id)
    }
    console.log(workoutId)
    return (
        <Container>
            <div className={styles.wrapper}>
                <LeftSide setWorkoutClickHandler={setWorkoutClickHandler}/>
                <RightSide workoutId={workoutId}/>
            </div>
        </Container>
    )
}

export default WorkoutsPage