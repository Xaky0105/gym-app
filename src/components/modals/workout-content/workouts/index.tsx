import { FC, useState } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';

import { useAppDispatch } from '@/hooks/redux-hook';
import { setStepWorkoutModal } from '@/store/modal/slice';
import { STEP_MODAL } from '@/types/modal';
import Tooltip from '@mui/material/Tooltip';

import { DeleteWorkoutMenu } from './delete-workout-menu';
import { WorkoutsList } from './workouts-list';

import styles from './index.module.scss';

export const Workouts: FC = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [workoutId, setWorkoutId] = useState('');
    const deleteWorkoutClickHandler = (id: string) => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
        setWorkoutId(id);
    };
    const deleteModalToggler = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };
    const dispatch = useAppDispatch();
    return (
        <div className={styles.content}>
            <div className={styles.block}>
                <h3 className={styles.title}>Тренировки на этот день</h3>
                <WorkoutsList deleteWorkoutClickHandler={deleteWorkoutClickHandler} />
            </div>
            <div className={styles.btn}>
                <Tooltip title={'Выбрать из списка'} disableInteractive enterDelay={500} leaveDelay={200}>
                    <span onClick={() => dispatch(setStepWorkoutModal(STEP_MODAL.CHOISE_WORKOUTS))}>
                        <BsPlusSquareDotted size={40} />
                    </span>
                </Tooltip>
            </div>
            {isDeleteModalOpen && <DeleteWorkoutMenu workoutId={workoutId} deleteModalToggler={deleteModalToggler} />}
        </div>
    );
};
