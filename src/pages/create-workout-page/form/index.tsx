import { FC } from 'react'
import { useFormik } from 'formik';
import { createWorkoutSchema } from "../../../sheme";
import TextField from '@mui/material/TextField';
import { Exercise } from '../../../types/workout';
import ExerciseList from '../../../components/exercise-list';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hook';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../types/route';
import ButtonStandart from '../../../components/buttons/button-standart';
import { getWorkouts } from '../../../store/selectors';
import { createOrEditWorkout } from '../../../store/actions/asyncAction';
import styles from './index.module.scss'

type FormPropsType = {
    temporaryExercise: Exercise[]
    togglerTemporaryExercise: (exercise: Exercise) => void
    clearTemporaryExercise: () => void
    editableWorkoutId?: string
}

const Form:FC<FormPropsType> = ({temporaryExercise, togglerTemporaryExercise, clearTemporaryExercise, editableWorkoutId}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userWorkouts = useAppSelector(getWorkouts)
    const isDisabledBtn = () => temporaryExercise.length === 0
    const formik = useFormik({
        initialValues: {
            workoutName: editableWorkoutId ? userWorkouts[editableWorkoutId].workoutName : '',
        },
        validationSchema: createWorkoutSchema,
        onSubmit: (workoutName) => {
            const createUserWorkout = (id: string) => {
                const dataTraining = {
                    ...workoutName,
                    id,
                    exercises: temporaryExercise
                }
                return dataTraining
            }
            if (editableWorkoutId) {
                const workout = createUserWorkout(editableWorkoutId)
                dispatch(createOrEditWorkout(workout, 'edit'))
                navigate(ROUTE_PATH.WORKOUT)
            } else {
                const id = uuidv4()
                const workout = createUserWorkout(id)
                dispatch(createOrEditWorkout(workout, 'create'))
                clearTemporaryExercise()
                formik.resetForm()
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.wrapper}>
                <TextField 
                    fullWidth
                    variant="standard"
                    id="workoutName"
                    name="workoutName"
                    label="Введите название тренировки"
                    value={formik.values.workoutName}
                    onChange={formik.handleChange}
                    error={formik.touched.workoutName && Boolean(formik.errors.workoutName)}
                    helperText={formik.touched.workoutName && formik.errors.workoutName}
                />
                <ExerciseList exerciseList={temporaryExercise} onClickHandler={togglerTemporaryExercise}/>
            </div>
            <ButtonStandart 
                handleClick={() => {}} 
                name={editableWorkoutId ? 'Завершить редактирование' : 'Создать тренировку'}
                disabled={isDisabledBtn()}
                type='submit'
            />
        </form>
    )
}

export default Form