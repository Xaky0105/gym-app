import { FC, useContext } from 'react';
import { useFormik } from 'formik';
import { createWorkoutSchema } from '../../../../sheme';
import TextField from '@mui/material/TextField';
import { ExerciseInWorkout, Workout, WorkoutOnCalendar } from '../../../../types/workout';
import { ExerciseList } from './exercise-list';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hook';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../types/route';
import { ButtonStandart } from '../../../../components/buttons/button-standart';
import { getWorkouts } from '../../../../store/selectors';
import { createOrEditWorkout } from '../../../../store/asyncActions/workoutAsyncAction';
import styles from './index.module.scss';
import { Context } from '../..';

type FormPropsType = {
    clearTemporaryExercise: () => void;
    editableWorkoutId?: string;
};

export const Form: FC<FormPropsType> = ({ clearTemporaryExercise, editableWorkoutId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { temporaryExercise } = useContext(Context);
    const userWorkouts = useAppSelector(getWorkouts);
    const isDisabledBtn = () => temporaryExercise.length === 0;
    const formik = useFormik({
        initialValues: {
            workoutName: editableWorkoutId ? userWorkouts[editableWorkoutId].workoutName : '',
        },
        validationSchema: createWorkoutSchema,
        onSubmit: (workoutName) => {
            const configUserWorkout = (id: string) => {
                const exercises: { [k: string]: ExerciseInWorkout } = {};
                temporaryExercise.forEach((item) => {
                    exercises[item.id] = item;
                });
                const dataTraining = {
                    ...workoutName,
                    id,
                    exercises,
                };
                return dataTraining;
            };
            if (editableWorkoutId) {
                const workout: Workout = configUserWorkout(editableWorkoutId);
                dispatch(createOrEditWorkout(workout, 'edit'));
                navigate(ROUTE_PATH.WORKOUT);
            } else {
                const id = uuidv4();
                const workout: Workout = configUserWorkout(id);
                dispatch(createOrEditWorkout(workout, 'create'));
                clearTemporaryExercise();
                formik.resetForm();
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.wrapper}>
                <TextField
                    fullWidth
                    sx={{
                        marginBottom: '20px',
                        '& .MuiFormHelperText-root': {
                            position: 'absolute',
                            top: '100%',
                        },
                    }}
                    variant="standard"
                    id="workoutName"
                    name="workoutName"
                    label="Введите название тренировки"
                    value={formik.values.workoutName}
                    onChange={formik.handleChange}
                    error={formik.touched.workoutName && Boolean(formik.errors.workoutName)}
                    helperText={formik.touched.workoutName && formik.errors.workoutName}
                    color="success"
                />
                <ExerciseList />
            </div>
            <ButtonStandart
                handleClick={() => {}}
                name={editableWorkoutId ? 'Завершить редактирование' : 'Создать тренировку'}
                disabled={isDisabledBtn()}
                type="submit"
            />
        </form>
    );
};
