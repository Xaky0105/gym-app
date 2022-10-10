import { FC } from "react";
import { MdClose } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti'
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../types/route";
import { getWorkouts } from "../../store/selectors";
import { deleteWorkout } from "../../store/actions/asyncAction";
import _ from "lodash";
import styles from './index.module.scss'


type WorkoutListPropTypes = {
    setWorkoutClickHandler: (id: string | null) => void
}

const WorkoutList:FC<WorkoutListPropTypes> = ({ setWorkoutClickHandler }) => {
    const userWorkouts = useAppSelector(getWorkouts)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onClickEditWorkout = (id: string) => {
        navigate(ROUTE_PATH.EDIT_WORKOUT, { state: { editableWorkoutId: id } })
    }
    const onClickDeleteWorkout = (id: string) => (e: any) => {
        e.stopPropagation()
        setWorkoutClickHandler(null)
        dispatch(deleteWorkout(id))
    }
    return (
        <>
            {_.isEmpty(userWorkouts) 
            ?
            <p className={styles.notWorkouts}>Вы не создали ни одной тренировки</p>
            :
            <ul className={styles.listWorkout}>
                {_.toArray(userWorkouts).map((workout, i) => (
                    <li 
                        className={styles.workout} 
                        key={i}
                        onClick={() => setWorkoutClickHandler(workout.id)}
                    >
                        <p className={styles.name}>{workout.workoutName}</p>
                        <div className={styles.settingsBlock}>
                            <Tooltip title="Редактировать" disableInteractive enterDelay={500}>
                                <div 
                                        className={styles.itemWrapper}
                                        onClick={() => onClickEditWorkout(workout.id)}
                                    >
                                        <TiPencil className={styles.settingItem}/>
                                </div>
                            </Tooltip>
                            <Tooltip title="Удалить" disableInteractive enterDelay={500}>
                                <div 
                                        className={styles.itemWrapper}
                                        onClick={onClickDeleteWorkout(workout.id)}
                                    >
                                        <MdClose className={styles.settingItem}/>
                                </div>
                            </Tooltip>
                        </div>
                    </li>
                ))}
            </ul>
            }
        </>
        
    )
}

export default WorkoutList