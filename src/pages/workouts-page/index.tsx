import { FC, useCallback, useState } from 'react';

import { ContainerTwoPart } from '@/compound/container-two-part';

import { LeftSide } from './left-side';
import { RightSide } from './right-side';

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
