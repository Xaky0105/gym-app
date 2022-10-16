import { FC } from 'react'
import { WorkoutList } from '../../../components/workout-list';
import { ButtonStandart } from '../../../components/buttons/button-standart'
import { ROUTE_PATH } from '../../../types/route';
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

type LeftSidePropsType = {
    setWorkoutClickHandler: (id: string | null) => void
}

export const LeftSide:FC<LeftSidePropsType> = ({setWorkoutClickHandler}) => {
    const navigate = useNavigate()
    const btnClickHandler = () => {
        navigate(ROUTE_PATH.CREATE_WORKOUT)
    }
    return (
        <div className={styles.leftSide}>
            <h2 className={styles.title}>Список ваших тренировок</h2>
            <div className={styles.block}>
                <div className={styles.content}>
                    <WorkoutList setWorkoutClickHandler={setWorkoutClickHandler}/>
                </div>
                <ButtonStandart 
                    name='Создать тренировку'
                    handleClick={btnClickHandler}
                />
            </div>
        </div>
    )
}