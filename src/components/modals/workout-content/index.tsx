import { FC } from 'react';
import { useAppSelector } from '../../../hooks/redux-hook';
import { getStepWorkoutModale } from '../../../store/selectors';
import { ChoiseWorkouts } from './choise-workouts';
import { Exercises } from './exercises';
import { Sets } from './sets';
import { Workouts } from './workouts';

export enum STEP_MODAL {
    WORKOUTS = 'WORKOUTS',
    CHOISE_WORKOUTS = 'CHOISE_WORKOUTS',
    EXERCISES = 'EXERCISES',
    SETS = 'SETS',
}

const renderContentModal = (step: STEP_MODAL) => {
    switch (step) {
        case STEP_MODAL.WORKOUTS:
            return <Workouts />;
        case STEP_MODAL.CHOISE_WORKOUTS:
            return <ChoiseWorkouts />;
        case STEP_MODAL.EXERCISES:
            return <Exercises />;
        case STEP_MODAL.SETS:
            return <Sets />;
        default:
            return <Workouts />;
    }
};

export const WorkoutContentModale: FC = () => {
    const stepWorkoutModale = useAppSelector(getStepWorkoutModale);
    return renderContentModal(stepWorkoutModale);
};
