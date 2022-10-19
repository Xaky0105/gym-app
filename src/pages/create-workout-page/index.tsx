import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '../../compound/container';
import { useAppSelector } from '../../hooks/redux-hook';
import { getWorkouts } from '../../store/selectors';
import { Exercise } from '../../types/workout';
import _ from 'lodash';
import styles from './index.module.scss';
import { LeftSide } from './left-side';
import { RightSide } from './right-side';

interface CustomUseLocationState {
    editableWorkoutId: string;
}

export const CreateWorkoutPage: FC = () => {
    const location = useLocation();
    const state = location.state as CustomUseLocationState;
    const editableWorkoutId = state ? state.editableWorkoutId : '';

    const userWorkouts = useAppSelector(getWorkouts);
    const [temporaryExercise, setTemporaryExercise] = useState<Exercise[]>(() => {
        return state ? _.toArray(userWorkouts[editableWorkoutId].exercises) : [];
    });
    const clearTemporaryExercise = () => {
        setTemporaryExercise([]);
    };
    const togglerTemporaryExercise = (exercise: Exercise) => {
        setTemporaryExercise((prevEx) => {
            if (!prevEx.find((ex) => ex.id === exercise.id)) {
                return [...prevEx, exercise];
            } else {
                return [...prevEx.filter((ex) => ex.id !== exercise.id)];
            }
        });
    };
    return (
        <Container>
            <div className={styles.wrapper}>
                <LeftSide
                    temporaryExercise={temporaryExercise}
                    togglerTemporaryExercise={togglerTemporaryExercise}
                    clearTemporaryExercise={clearTemporaryExercise}
                    editableWorkoutId={editableWorkoutId}
                />
                <RightSide temporaryExercise={temporaryExercise} togglerTemporaryExercise={togglerTemporaryExercise} />
            </div>
        </Container>
    );
};
