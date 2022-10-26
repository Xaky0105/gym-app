import { FC } from 'react';
import { ExerciseAccordion } from './accordion';
import { Right } from '../../../compound/container-two-part/right';
import styles from './index.module.scss';

export const RightSide: FC = () => {
    return (
        <Right title="Список упражнений">
            <div className={styles.block}>
                <div className={styles.content}>
                    <ExerciseAccordion />
                </div>
            </div>
        </Right>
    );
};
