import { FC } from 'react';

import { useAppSelector } from '@/hooks/redux-hook';
import { selectStepWorkoutModale } from '@/store/modal/selectors';
import { STEP_MODAL } from '@/types/other';

import { ChoiseWorkouts } from './choise-workouts';
import { Exercises } from './exercises';
import { Sets } from './sets';
import { Workouts } from './workouts';

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
    const stepWorkoutModale = useAppSelector(selectStepWorkoutModale);
    return renderContentModal(stepWorkoutModale);
};
