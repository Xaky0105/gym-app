import { FC, useState } from 'react'
import { STEP_MODAL } from '../'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hook'
import { setStepWorkoutModale, toggleModale } from '../../../../store/slices/modaleSlice'
import { getSelectedDay, getWorkouts } from '../../../../store/selectors'
import { MdArrowBack } from 'react-icons/md';
import { HOW_TO_REPEAT, Workout } from '../../../../types/workout'
import { generateWorkout } from '../../../../utils/workout';
import { addWorkoutToCalendarAsync } from '../../../../store/asyncActions/workoutAsyncAction'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../../types/route'
import { SelectRepeat } from './select-repeat'
import { ButtonStandart } from '../../../buttons/button-standart'
import { SelectNumber } from './select-number'
import styles from './index.module.scss'

export const ChoiseWorkouts:FC = () => {
    const [selectWorkout, setSelectWorkout] = useState<Workout | null>(null)
    const [howToRepeat, setHowToRepeat] = useState(HOW_TO_REPEAT.DONT_REPEAT)
    const [repeatInterval, setRepeatInterval] = useState(2)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userWorkout = useAppSelector(getWorkouts)
    const daySelected = useAppSelector(getSelectedDay)

    const userWorkoutArr = _.toArray(userWorkout)
    
    const selectWorkoutClickHandler = (workout: Workout) => {
        setSelectWorkout(workout)
    }

    const howToRepeatCLickHandler = (howToRepeat: HOW_TO_REPEAT) => {
        setHowToRepeat(howToRepeat)
    }

    const repeatClickHandler = (repeatValue: number) => {
        setRepeatInterval(repeatValue)
    }

    const addWorkoutOnCalendarClickHandler = () => {
        const workout = generateWorkout(daySelected, selectWorkout as Workout)
        dispatch(addWorkoutToCalendarAsync(workout, howToRepeat, repeatInterval))
        dispatch(toggleModale())
    }

    const createWorkoutClickHandler = () => {
        navigate(ROUTE_PATH.CREATE_WORKOUT)
        dispatch(toggleModale())
    }

    const activeWorkoutClass = (workout: Workout) => {
        return _.isEqual(workout, selectWorkout) ? `${styles.activeWorkout}` : ''
    }

    return (
        <div className={styles.content}>
            <div className={styles.topBlock}>
                <span 
                    className={styles.back} 
                    onClick={() => dispatch(setStepWorkoutModale(STEP_MODAL.WORKOUTS))}
                >
                    <MdArrowBack size={20}/>
                </span>
                <h3 className={styles.title}>Выберите тренировку из списка</h3>
                {_.isEmpty(userWorkout) ?
                <p className={styles.noWorkout}>Нет созданных тренировок</p>
                :
                <div className={styles.workoutList}>
                    {userWorkoutArr.map((workout) => (
                        <div 
                            onClick={() => selectWorkoutClickHandler(workout)}
                            className={`${styles.workoutItem} ${activeWorkoutClass(workout)}`}
                            key={workout.id}
                        >
                            <span className={styles.workoutName}>{workout.workoutName}</span>
                        </div>
                    ))}
                </div>
                }
                
            </div>
            <div className={styles.botBlock}>
                {_.isEmpty(userWorkout) 
                    ?
                    <ButtonStandart handleClick={createWorkoutClickHandler} name={'Создать тренировку'}/>
                    :
                    <>
                        <div className={styles.selectGroup}>
                            <SelectRepeat
                                howToRepeatCLickHandler={howToRepeatCLickHandler}
                                howToRepeat={howToRepeat}
                            />
                            {howToRepeat === HOW_TO_REPEAT.INTERVAL &&
                                <SelectNumber 
                                    repeatInterval={repeatInterval}
                                    repeatClickHandler={repeatClickHandler}
                                />
                            }
                        </div>
                        <ButtonStandart 
                            handleClick={addWorkoutOnCalendarClickHandler} 
                            name={'Добавить'}
                            disabled={!selectWorkout}
                        />
                    </>
                    
                }
            </div>
        </div>
    )
}