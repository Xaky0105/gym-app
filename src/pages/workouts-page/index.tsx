import { FC, useState, useCallback } from 'react';
import { Container } from '../../compound/container';
import { RightSide } from './right-side';
import { LeftSide } from './left-side';
import styles from './index.module.scss';

export const WorkoutsPage: FC = () => {
    const [workoutId, setWorkoutId] = useState<string | null>(null);
    const setWorkoutClickHandler = (id: string | null) => {
        setWorkoutId(id);
    };
    const setWorkoutClickHandlerCallback = useCallback(setWorkoutClickHandler, []);
    return (
        <Container>
            <div className={styles.wrapper}>
                <LeftSide setWorkoutClickHandlerCallback={setWorkoutClickHandlerCallback} />
                <RightSide workoutId={workoutId} />
            </div>
        </Container>
    );
};
