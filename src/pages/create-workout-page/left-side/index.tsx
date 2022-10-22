import { FC } from 'react';
import { Left } from '../../../compound/container-two-part/left';
import { ExerciseInWorkout } from '../../../types/workout';
import { Form } from './form';

type LeftSideType = {
    temporaryExercise: ExerciseInWorkout[];
    setTemporaryExerciseHandler: (exercise: ExerciseInWorkout) => void;
    clearTemporaryExercise: () => void;
    editableWorkoutId: string;
};

export const LeftSide: FC<LeftSideType> = ({
    temporaryExercise,
    setTemporaryExerciseHandler,
    clearTemporaryExercise,
    editableWorkoutId,
}) => {
    return (
        <Left title="Моя тренировка">
            <Form
                temporaryExercise={temporaryExercise}
                setTemporaryExerciseHandler={setTemporaryExerciseHandler}
                clearTemporaryExercise={clearTemporaryExercise}
                editableWorkoutId={editableWorkoutId}
            />
        </Left>
    );
};
