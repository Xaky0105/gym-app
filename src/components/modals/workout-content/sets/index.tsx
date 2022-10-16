import { FC } from 'react'
import { STEP_MODAL } from '..'
import { MdArrowBack } from 'react-icons/md';
import { BsPlusSquareDotted } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hook'
import { setStepWorkoutModale } from '../../../../store/slices/modaleSlice'
import { getExerciseById } from '../../../../store/selectors';
import { Set } from './set';
import { updateExerciseAsync } from '../../../../store/asyncActions/workoutAsyncAction';
import styles from './index.module.scss'

export const Sets:FC = () => {
    const dispatch = useAppDispatch()

    const selectExercise = useAppSelector(getExerciseById)

    const addSet = () => {
        const updateExercise = {
            ...selectExercise,
            sets: [
                ...selectExercise.sets!,
                {amount: 0, weight: 0}
            ]
        }
        dispatch(updateExerciseAsync(updateExercise))
    }
    const removeSet = (setIndex: number) => {
        const newSets = selectExercise.sets!.filter((_, i) => i !== setIndex)
        const exercise = {
            ...selectExercise,
            sets: newSets
        }
        dispatch(updateExerciseAsync(exercise))
    }
    return (
        <div className={styles.content}>
            <div className={styles.block}>
                <span 
                    className={styles.back} 
                    onClick={() => dispatch(setStepWorkoutModale(STEP_MODAL.EXERCISES))}
                >
                    <MdArrowBack size={20}/>
                </span>
                <h3 className={styles.title}>{selectExercise.name}</h3>
                <ul className={styles.list}>
                    {selectExercise.sets!.map((set, index) => (
                        <Set
                            set={set}
                            index={index}
                            key={index}
                            removeSet={removeSet}
                        />
                    ))}
                </ul>
            </div>
            <div className={styles.addSetBtn}>
                <Tooltip title={'Добавить подход'} disableInteractive enterDelay={500} leaveDelay={200}>
                    <span onClick={addSet}><BsPlusSquareDotted size={30}/></span>
                </Tooltip>
            </div>
        </div>
    )
}