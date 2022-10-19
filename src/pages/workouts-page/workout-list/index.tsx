import { FC, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hook';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../types/route';
import { getIsOpenConfirmModale, getWorkouts } from '../../../store/selectors';
import { deleteWorkout } from '../../../store/asyncActions/workoutAsyncAction';
import _ from 'lodash';
import styles from './index.module.scss';
import { setConfirmModaleIsOpen } from '../../../store/slices/modaleSlice';
import { ConfirmPopup } from '../../../compound/confirm-popup';
import { DeleteWorkoutContent } from '../../../components/modals/confirm-content/delete-workout';

type WorkoutListPropTypes = {
    setWorkoutClickHandlerCallback: (id: string | null) => void;
};

export const WorkoutList: FC<WorkoutListPropTypes> = ({ setWorkoutClickHandlerCallback }) => {
    const [workoutId, setWorkoutId] = useState('');

    const userWorkouts = useAppSelector(getWorkouts);
    const isOpenConfirmModale = useAppSelector(getIsOpenConfirmModale);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onClickEditWorkout = (id: string) => {
        navigate(ROUTE_PATH.EDIT_WORKOUT, { state: { editableWorkoutId: id } });
    };
    const onClickDeleteIcon = (id: string) => (e: any) => {
        e.stopPropagation();
        dispatch(setConfirmModaleIsOpen(true));
        setWorkoutId(id);
    };

    const onClickDeleteWorkout = () => {
        dispatch(deleteWorkout(workoutId));
        setWorkoutClickHandlerCallback(null);
    };

    const onCloseConfirmPopup = () => {
        dispatch(setConfirmModaleIsOpen(false));
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
                                    <div className={styles.itemWrapper} onClick={onClickDeleteIcon(workout.id)}>
                                        <MdClose className={styles.settingItem} />
                                    </div>
                                </Tooltip>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <ConfirmPopup onClose={onCloseConfirmPopup} isOpened={isOpenConfirmModale}>
                <DeleteWorkoutContent message="Вы уверены что хотите удалить тренировку?" onOk={onClickDeleteWorkout} />
            </ConfirmPopup>
        </>
    );
};
