import { FC, useState } from 'react'
import { useAppDispatch } from '../../../../../hooks/redux-hook'
import { deleteWorkoutFromCalendarAsync } from '../../../../../store/asyncActions/workoutAsyncAction'
import { toggleModale } from '../../../../../store/slices/modaleSlice'
import { DELETE_WORKOUT_FROM_CALENDAR } from '../../../../../types/workout'
import { ButtonStandart } from '../../../../buttons/button-standart'
import styles from './index.module.scss'

type DeleteModalPropsType = {
    workoutId: string
    deleteModalToggler: () => void
}

type ChoiseItemType = {
    name: string
    type: DELETE_WORKOUT_FROM_CALENDAR
}

const choiseList: ChoiseItemType[] = [
    {name: 'Только одну', type: DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE},
    {name: 'Эту и следующие', type: DELETE_WORKOUT_FROM_CALENDAR.THIS_AND_NEXT}
]

export const DeleteWorkoutMenu:FC<DeleteModalPropsType> = ({workoutId, deleteModalToggler}) => {
    const [deleteType, setDeleteType] = useState(DELETE_WORKOUT_FROM_CALENDAR.ONLY_ONE)
    const dispatch = useAppDispatch()
    const deleteWorkoutClickHandler = () => {
        dispatch(deleteWorkoutFromCalendarAsync(workoutId, deleteType))
        deleteModalToggler()
        dispatch(toggleModale())
    }
    const cn = (choise: ChoiseItemType) => {
        return choise.type === deleteType ? `${styles.item} ${styles.active}` : `${styles.item}`
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <h4 className={styles.title}>Варианты удаления:</h4>
                    <ul>
                        {choiseList.map((choise) => (
                            <li 
                                onClick={() => setDeleteType(choise.type)}
                                className={cn(choise)}
                                key={choise.type}
                            >
                                {choise.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <ButtonStandart name='Удалить' handleClick={deleteWorkoutClickHandler}/>
            </div>
            <div className={styles.mask} onClick={deleteModalToggler}></div>
        </>
    )
}