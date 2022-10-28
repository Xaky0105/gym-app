import { createContext, FC, useState } from 'react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import { ContainerTwoPart } from '@/compound/container-two-part';
import { useAppSelector } from '@/hooks/redux-hook';
import { getWorkouts } from '@/store/selectors';
import { ExerciseInWorkout } from '@/types/workout';
import { getSortedExerciseByPosition } from '@/utils/exercise';

import { LeftSide } from './left-side';
import { RightSide } from './right-side';

interface CustomUseLocationState {
    editableWorkoutId: string;
}

interface ContextInterface {
    temporaryExercise: ExerciseInWorkout[];
    setTemporaryExerciseHandler: (exercise: ExerciseInWorkout) => void;
}

export const Context = createContext<ContextInterface>({} as ContextInterface);

export const CreateWorkoutPage: FC = () => {
    const location = useLocation();
    const state = location.state as CustomUseLocationState;
    const editableWorkoutId = state ? state.editableWorkoutId : '';

    const userWorkouts = useAppSelector(getWorkouts);
    const [temporaryExercise, setTemporaryExercise] = useState<ExerciseInWorkout[]>(() => {
        return state ? getSortedExerciseByPosition(userWorkouts[editableWorkoutId].exercises) : [];
    });

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
        <Context.Provider value={{ temporaryExercise, setTemporaryExerciseHandler }}>
            <ContainerTwoPart>
                <LeftSide clearTemporaryExercise={clearTemporaryExercise} editableWorkoutId={editableWorkoutId} />
                <RightSide />
            </ContainerTwoPart>
        </Context.Provider>
    );
};
