import { FC } from "react";
import { MdClose } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti'
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../types/route";
import { getWorkouts } from "../../store/selectors";
import { deleteWorkout } from "../../store/actions/asyncAction";
import styles from './index.module.scss'


type WorkoutListPropTypes = {
    setWorkoutClickHandler: (id: string | null) => void
}

const WorkoutList:FC<WorkoutListPropTypes> = ({ setWorkoutClickHandler }) => {
    const userWorkouts = useAppSelector(getWorkouts)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userWorkoutsArr = Object.entries(userWorkouts)
    const onClickEditWorkout = (id: string) => {
        navigate(ROUTE_PATH.EDIT_WORKOUT, { state: { editableWorkoutId: id } })
    }
    const onClickDeleteWorkout = (id: string) => (e: any) => {
        e.stopPropagation()
        setWorkoutClickHandler(null)
        dispatch(deleteWorkout(id))
    }
    return (
        <ul className={styles.listWorkout}>
            {userWorkoutsArr.map((item, i) => (
                <li 
                    className={styles.workout} 
                    key={i}
                    onClick={() => setWorkoutClickHandler(item[0])}
                >
                    <p className={styles.name}>{item[1].workoutName}</p>
                    <div className={styles.settingsBlock}>
                        <Tooltip title="Редактировать" disableInteractive enterDelay={500}>
                            <div 
                                    className={styles.itemWrapper}
                                    onClick={() => onClickEditWorkout(item[1].id)}
                                >
                                    <TiPencil className={styles.settingItem}/>
                            </div>
                        </Tooltip>
                        <Tooltip title="Удалить" disableInteractive enterDelay={500}>
                            <div 
                                    className={styles.itemWrapper}
                                    onClick={onClickDeleteWorkout(item[1].id)}
                                >
                                    <MdClose className={styles.settingItem}/>
                            </div>
                        </Tooltip>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default WorkoutList