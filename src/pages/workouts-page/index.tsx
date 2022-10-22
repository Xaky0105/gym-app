import { FC, useState, useCallback } from 'react';
import { RightSide } from './right-side';
import { LeftSide } from './left-side';
import { ContainerTwoPart } from '../../compound/container-two-part';

export const WorkoutsPage: FC = () => {
    const [workoutId, setWorkoutId] = useState<string | null>(null);
    const setWorkoutClickHandler = (id: string | null) => {
        setWorkoutId(id);
    };
    const setWorkoutClickHandlerCallback = useCallback(setWorkoutClickHandler, []);
    return (
        <ContainerTwoPart>
            <LeftSide setWorkoutClickHandlerCallback={setWorkoutClickHandlerCallback} />
            <RightSide workoutId={workoutId} />
        </ContainerTwoPart>
    );
};
