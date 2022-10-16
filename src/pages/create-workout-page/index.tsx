import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import ExerciseAccordion from "../../components/exercise-accordion";
import { Container } from "../../compound/container";
import { useAppSelector } from "../../hooks/redux-hook";
import { getWorkouts } from "../../store/selectors";
import { Exercise } from "../../types/workout";
import _ from "lodash";
import { Form } from "./form";
import styles from './index.module.scss'

interface CustomUseLocationState {
    editableWorkoutId: string
}

export const CreateWorkoutPage:FC = () => {
    const location = useLocation()
    const state = location.state as CustomUseLocationState
    const editableWorkoutId = state ? state.editableWorkoutId : ''
    
    const userWorkouts = useAppSelector(getWorkouts)
    const [temporaryExercise, setTemporaryExercise] = useState<Exercise[]>(() => {
        return state ? _.toArray(userWorkouts[editableWorkoutId].exercises) : []
    })
    const clearTemporaryExercise = () => {
        setTemporaryExercise([])
    }
    const togglerTemporaryExercise = (exercise: Exercise) => {
        setTemporaryExercise((prevEx) => {
            if (!prevEx.find((ex) => ex.id === exercise.id)) {
                return [...prevEx, exercise]
            } else {
                return [...prevEx.filter((ex) => ex.id !== exercise.id)]
            }
        })
    }
    return (    
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.leftSide}>
                    <h2 className={styles.title}>Моя тренировка</h2>
                    <Form 
                        temporaryExercise={temporaryExercise}
                        togglerTemporaryExercise={togglerTemporaryExercise}
                        clearTemporaryExercise={clearTemporaryExercise}
                        editableWorkoutId={editableWorkoutId}
                    />
                </div>
                <div className={styles.rightSide}>
                    <h2 className={styles.title}>Список упражнений</h2>
                    <div className={styles.block}>
                        <div className={styles.content}>
                            <ExerciseAccordion 
                                temporaryExercise={temporaryExercise}
                                togglerTemporaryExercise={togglerTemporaryExercise}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}