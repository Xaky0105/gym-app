import { FC, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { WorkoutsList } from './workouts-list'
import { useAppDispatch } from '../../../../hooks/redux-hook';
import { setStepWorkoutModale } from '../../../../store/slices/modaleSlice';
import { STEP_MODAL } from '..';
import { DeleteWorkoutMenu } from './delete-workout-menu';
import styles from './index.module.scss'

export const Workouts:FC = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [workoutId, setWorkoutId] = useState('')
    const deleteWorkoutClickHandler = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDeleteModalOpen(!isDeleteModalOpen)
        setWorkoutId(id)
    }
    const deleteModalToggler = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen)
    }
    const dispatch = useAppDispatch()
    return (
        <div className={styles.content}>
            <div className={styles.block}>
                <h3 className={styles.title}>Тренировки на этот день</h3>
                <WorkoutsList deleteWorkoutClickHandler={deleteWorkoutClickHandler}/>
            </div>
            <div className={styles.btn}>
                <Tooltip title={'Выбрать из списка'} disableInteractive enterDelay={500} leaveDelay={200}>
                    <span onClick={() => dispatch(setStepWorkoutModale(STEP_MODAL.CHOISE_WORKOUTS))}>
                        <BsPlusSquareDotted size={40}/>
                    </span>
                </Tooltip>
            </div>
            {isDeleteModalOpen && 
            <DeleteWorkoutMenu 
                workoutId={workoutId} 
                deleteModalToggler={deleteModalToggler}
            />}
        </div>
    )
}