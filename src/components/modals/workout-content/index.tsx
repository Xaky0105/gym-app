import { FC } from 'react';

import { useAppSelector } from '@/hooks/redux-hook';
import { selectStepWorkoutModal } from '@/store/modal/selectors';
import { STEP_MODAL } from '@/types/other';

import { ChoiceWorkouts } from './choice-workouts';
import { Exercises } from './exercises';
import { Sets } from './sets';
import { Workouts } from './workouts';

const renderContentModal = (step: STEP_MODAL) => {
    switch (step) {
        case STEP_MODAL.WORKOUTS:
            return <Workouts />;
        case STEP_MODAL.CHOICE_WORKOUTS:
            return <ChoiceWorkouts />;
        case STEP_MODAL.EXERCISES:
            return <Exercises />;
        case STEP_MODAL.SETS:
            return <Sets />;
        default:
            return <Workouts />;
    }
};

export const WorkoutContentModal: FC = () => {
    const stepWorkoutModal = useAppSelector(selectStepWorkoutModal);
    return renderContentModal(stepWorkoutModal);
};
