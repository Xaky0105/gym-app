import { FC, useState } from 'react';
import cnBind from 'classnames/bind';
import { useSnackbar } from 'notistack';

import { ButtonStandart } from '@/components/buttons/button-standart';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { setModalWorkoutIsOpen } from '@/store/modal/slice';
import { deleteWorkoutFromCalendarAsync } from '@/store/workout-on-calendar/asyncActions';
import { selectIsLoadingWorkoutsCalendar } from '@/store/workout-on-calendar/selectors';
import { DELETE_WORKOUT_FROM_CALENDAR } from '@/types/workout';

import styles from './index.module.scss';

type DeleteModalPropsType = {
    workoutId: string;
    deleteModalToggler: () => void;
};

type ChoiseItemType = {
    name: string;
    type: DELETE_WORKOUT_FROM_CALENDAR;
};

const choiseList: ChoiseItemType[] = [
    { name: 'Только одну', type: DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE },
    {
        name: 'Эту и следующие',
        type: DELETE_WORKOUT_FROM_CALENDAR.THIS_AND_NEXT,
    },
];

const cx = cnBind.bind(styles);

export const DeleteWorkoutMenu: FC<DeleteModalPropsType> = ({ workoutId, deleteModalToggler }) => {
    const [deleteType, setDeleteType] = useState(DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE);

    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const isLoadingWorkoutsCalendar = useAppSelector(selectIsLoadingWorkoutsCalendar);
    const deleteWorkoutClickHandler = async () => {
        await dispatch(deleteWorkoutFromCalendarAsync(workoutId, deleteType, enqueueSnackbar));
        deleteModalToggler();
        dispatch(setModalWorkoutIsOpen(false));
    };

    const cn = (choise: ChoiseItemType) => cx('item', { active: choise.type === deleteType });
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <h4 className={styles.title}>Варианты удаления:</h4>
                    <ul>
                        {choiseList.map((choise) => (
                            <li onClick={() => setDeleteType(choise.type)} className={cn(choise)} key={choise.type}>
                                {choise.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <ButtonStandart
                    name="Удалить"
                    handleClick={deleteWorkoutClickHandler}
                    isloading={isLoadingWorkoutsCalendar}
                />
            </div>
            <div className={styles.mask} onClick={deleteModalToggler}></div>
        </>
    );
};
