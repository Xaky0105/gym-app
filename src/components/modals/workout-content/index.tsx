import { FC } from 'react';

import { STEP_MODAL } from '@/types/other';

import { ChoiceWorkouts } from './choice-workouts';
import { Exercises } from './exercises';
import { Sets } from './sets';
import { Workouts } from './workouts';
import { useAppSelector } from '@/hooks/redux-hook';

export const WorkoutContentModal = () => {
    const modalStep = useAppSelector((state) => state.modal.workoutModal.step);
    switch (modalStep) {
        case STEP_MODAL.WORKOUTS:
            return <Workouts />;
        case STEP_MODAL.CHOICE_WORKOUTS:
            return <ChoiceWorkouts />;
        case STEP_MODAL.EXERCISES:
            return <Exercises />;
        case STEP_MODAL.SETS:
            return <Sets />;
        default:
            return null;
    }
};
