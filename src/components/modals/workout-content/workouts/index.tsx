import { FC, useState } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';

import { useAppDispatch } from '@/hooks/redux-hook';
import { STEP_MODAL } from '@/types/other';
import Tooltip from '@mui/material/Tooltip';

import { DeleteWorkoutMenu } from './delete-workout-menu';
import { WorkoutsList } from './workouts-list';

import styles from './index.module.scss';
import { closeWorkoutModal, openWorkoutModal } from '@/store/modal/slice';

export const Workouts: FC = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [workoutId, setWorkoutId] = useState('');
    const dispatch = useAppDispatch();
    const deleteWorkoutClickHandler = (id: string) => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
        setWorkoutId(id);
    };
    const deleteModalToggler = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    return (
        <div className={styles.content}>
            <div className={styles.block}>
                <h3 className={styles.title}>Тренировки на этот день</h3>
                <WorkoutsList deleteWorkoutClickHandler={deleteWorkoutClickHandler} />
            </div>
            <div className={styles.btn}>
                <Tooltip title={'Выбрать из списка'} disableInteractive enterDelay={500} leaveDelay={200}>
                    <span onClick={() => dispatch(openWorkoutModal({ step: STEP_MODAL.CHOICE_WORKOUTS }))}>
                        <BsPlusSquareDotted size={40} />
                    </span>
                </Tooltip>
            </div>
            {isDeleteModalOpen && (
                <DeleteWorkoutMenu
                    workoutId={workoutId}
                    deleteModalToggler={deleteModalToggler}
                    onDelete={() => dispatch(closeWorkoutModal())}
                />
            )}
        </div>
    );
};
