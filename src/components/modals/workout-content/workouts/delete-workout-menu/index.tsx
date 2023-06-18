import { FC, useState } from 'react';
import cnBind from 'classnames/bind';
import { useSnackbar } from 'notistack';

import { ButtonStandard } from '@/components/buttons/button-standard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { deleteWorkoutFromCalendarAsync } from '@/store/workout-on-calendar/asyncActions';
import { selectIsLoadingWorkoutsCalendar } from '@/store/workout-on-calendar/selectors';
import { DELETE_WORKOUT_FROM_CALENDAR } from '@/types/workout';

import styles from './index.module.scss';

type DeleteModalPropsType = {
    workoutId: string;
    deleteModalToggler: () => void;
    onDelete: () => void;
};

type ChoiceItemType = {
    name: string;
    type: DELETE_WORKOUT_FROM_CALENDAR;
};

const choiceList: ChoiceItemType[] = [
    { name: 'Только одну', type: DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE },
    {
        name: 'Эту и следующие',
        type: DELETE_WORKOUT_FROM_CALENDAR.THIS_AND_NEXT,
    },
];

const cx = cnBind.bind(styles);

export const DeleteWorkoutMenu: FC<DeleteModalPropsType> = ({ workoutId, deleteModalToggler, onDelete }) => {
    const [deleteType, setDeleteType] = useState(DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE);

    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const isLoadingWorkoutsCalendar = useAppSelector(selectIsLoadingWorkoutsCalendar);
    const deleteWorkoutClickHandler = async () => {
        await dispatch(deleteWorkoutFromCalendarAsync(workoutId, deleteType, enqueueSnackbar));
        deleteModalToggler();
        onDelete();
    };

    const cn = (choice: ChoiceItemType) => cx('item', { active: choice.type === deleteType });
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <h4 className={styles.title}>Варианты удаления:</h4>
                    <ul>
                        {choiceList.map((choice) => (
                            <li onClick={() => setDeleteType(choice.type)} className={cn(choice)} key={choice.type}>
                                {choice.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <ButtonStandard
                    name="Удалить"
                    handleClick={deleteWorkoutClickHandler}
                    isLoading={isLoadingWorkoutsCalendar}
                />
            </div>
            <div className={styles.mask} onClick={deleteModalToggler}></div>
        </>
    );
};
