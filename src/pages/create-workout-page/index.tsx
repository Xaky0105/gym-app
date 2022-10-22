import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hook';
import { getWorkouts } from '../../store/selectors';
import { ExerciseInWorkout } from '../../types/workout';
import _ from 'lodash';
import { LeftSide } from './left-side';
import { RightSide } from './right-side';
import { ContainerTwoPart } from '../../compound/container-two-part';
import { getSortedExerciseByPosition } from '../../utils/exercise';

interface CustomUseLocationState {
    editableWorkoutId: string;
}

export const CreateWorkoutPage: FC = () => {
    const location = useLocation();
    const state = location.state as CustomUseLocationState;
    const editableWorkoutId = state ? state.editableWorkoutId : '';

    const userWorkouts = useAppSelector(getWorkouts);
    const [temporaryExercise, setTemporaryExercise] = useState<ExerciseInWorkout[]>(() => {
        return state ? getSortedExerciseByPosition(userWorkouts[editableWorkoutId].exercises) : [];
    });
    console.log(temporaryExercise);
    const clearTemporaryExercise = () => {
        setTemporaryExercise([]);
    };
    const setTemporaryExerciseHandler = (exercise: ExerciseInWorkout) => {
        setTemporaryExercise((prevEx) => {
            if (prevEx.find((ex) => ex.id === exercise.id)) {
                return [...prevEx.filter((ex) => ex.id !== exercise.id).map((ex, i) => ({ ...ex, position: i + 1 }))];
            } else {
                return [...prevEx, { ...exercise, position: temporaryExercise.length + 1 }];
            }
        });
    };
    return (
        <ContainerTwoPart>
            <LeftSide
                temporaryExercise={temporaryExercise}
                setTemporaryExerciseHandler={setTemporaryExerciseHandler}
                clearTemporaryExercise={clearTemporaryExercise}
                editableWorkoutId={editableWorkoutId}
            />
            <RightSide
                temporaryExercise={temporaryExercise}
                setTemporaryExerciseHandler={setTemporaryExerciseHandler}
            />
        </ContainerTwoPart>
    );
};
