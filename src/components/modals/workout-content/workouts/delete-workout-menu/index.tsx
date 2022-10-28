import { FC, useState } from 'react';

import { ButtonStandart } from '@/components/buttons/button-standart';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { deleteWorkoutFromCalendarAsync } from '@/store/asyncActions/workoutAsyncAction';
import { getIsLoadingWorkoutsCalendar } from '@/store/selectors';
import { setModaleWorkoutIsOpen } from '@/store/slices/modaleSlice';
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

export const DeleteWorkoutMenu: FC<DeleteModalPropsType> = ({ workoutId, deleteModalToggler }) => {
    const [deleteType, setDeleteType] = useState(DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE);
    const dispatch = useAppDispatch();
    const isLoadingWorkoutsCalendar = useAppSelector(getIsLoadingWorkoutsCalendar);
    const deleteWorkoutClickHandler = async () => {
        await dispatch(deleteWorkoutFromCalendarAsync(workoutId, deleteType));
        deleteModalToggler();
        dispatch(setModaleWorkoutIsOpen(false));
    };
    const cn = (choise: ChoiseItemType) => {
        return choise.type === deleteType ? `${styles.item} ${styles.active}` : `${styles.item}`;
    };
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
