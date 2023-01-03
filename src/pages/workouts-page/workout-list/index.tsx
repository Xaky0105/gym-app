import { FC, useState } from 'react';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { MdClose } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { DeleteContent } from '@/components/modals/confirm-content/delete-content';
import { ConfirmPopup } from '@/compound/confirm-popup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectIsOpenConfirmModal } from '@/store/modal/selectors';
import { setConfirmModalIsOpen } from '@/store/modal/slice';
import { deleteWorkout } from '@/store/workout/asyncActions';
import { selectWorkouts } from '@/store/workout/selectors';
import { ROUTE_PATH } from '@/types/other';
import Tooltip from '@mui/material/Tooltip';

import styles from './index.module.scss';

type WorkoutListPropTypes = {
    setWorkoutClickHandlerCallback: (id: string | null) => void;
};

export const WorkoutList: FC<WorkoutListPropTypes> = ({ setWorkoutClickHandlerCallback }) => {
    const [workoutId, setWorkoutId] = useState('');

    const userWorkouts = useAppSelector(selectWorkouts);
    const isOpenConfirmModal = useAppSelector(selectIsOpenConfirmModal);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onClickEditWorkout = (id: string) => {
        navigate(ROUTE_PATH.EDIT_WORKOUT, { state: { editableWorkoutId: id } });
    };
    const onClickDeleteIcon = (id: string) => {
        dispatch(setConfirmModalIsOpen(true));
        setWorkoutId(id);
    };

    const onClickDeleteWorkout = () => {
        dispatch(deleteWorkout(workoutId, enqueueSnackbar));
        setWorkoutClickHandlerCallback(null);
    };

    const onCloseConfirmPopup = () => {
        dispatch(setConfirmModalIsOpen(false));
    };
    return (
        <>
            {_.isEmpty(userWorkouts) ? (
                <p className={styles.notWorkouts}>Вы не создали ни одной тренировки</p>
            ) : (
                <ul className={styles.listWorkout}>
                    {_.toArray(userWorkouts).map((workout, i) => (
                        <li
                            className={styles.workout}
                            key={i}
                            onClick={() => setWorkoutClickHandlerCallback(workout.id)}
                        >
                            <p className={styles.name}>{workout.workoutName}</p>
                            <div className={styles.settingsBlock}>
                                <Tooltip title="Редактировать" disableInteractive enterDelay={500}>
                                    <div className={styles.itemWrapper} onClick={() => onClickEditWorkout(workout.id)}>
                                        <TiPencil className={styles.settingItem} />
                                    </div>
                                </Tooltip>
                                <Tooltip title="Удалить" disableInteractive enterDelay={500}>
                                    <div
                                        className={styles.itemWrapper}
                                        onMouseDown={() => onClickDeleteIcon(workout.id)}
                                    >
                                        <MdClose className={styles.settingItem} />
                                    </div>
                                </Tooltip>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <ConfirmPopup onClose={onCloseConfirmPopup} isOpened={isOpenConfirmModal}>
                <DeleteContent message="Вы уверены что хотите удалить тренировку?" onOk={onClickDeleteWorkout} />
            </ConfirmPopup>
        </>
    );
};
