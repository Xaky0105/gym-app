import { FC } from 'react'
import Tooltip from '@mui/material/Tooltip';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { WorkoutsList } from './workouts-list'
import styles from './index.module.scss'
import { useAppDispatch } from '../../../../hooks/redux-hook';
import { setStepWorkoutModale } from '../../../../store/modaleSlice';
import { STEP_MODAL } from '..';

export const Workouts:FC = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={styles.content}>
            <h3 className={styles.title}>Тренировки на этот день</h3>
            <WorkoutsList />
            <div className={styles.btn}>
                <Tooltip title={'Выбрать из списка'} disableInteractive enterDelay={500} leaveDelay={200}>
                    <span onClick={() => dispatch(setStepWorkoutModale(STEP_MODAL.CHOISE_WORKOUTS))}>
                        <BsPlusSquareDotted size={40}/>
                    </span>
                </Tooltip>
            </div>
        </div>
    )
}