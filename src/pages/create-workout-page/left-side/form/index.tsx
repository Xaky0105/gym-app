import { FC, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ButtonStandard } from '@/components/buttons/button-standard';
import { workoutColors } from '@/constants/constant';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { Context } from '@/pages/create-workout-page';
import { createWorkoutScheme } from '@/scheme';
import { createOrEditWorkout } from '@/store/workout/asyncActions';
import { selectWorkouts } from '@/store/workout/selectors';
import { ROUTE_PATH } from '@/types/other';
import { ExerciseInWorkout, Workout } from '@/types/workout';
import TextField from '@mui/material/TextField';

import { ExerciseList } from './exercise-list';
import { SelectColor } from './select-color';

import styles from './index.module.scss';

type FormPropsType = {
    clearTemporaryExercise: () => void;
    editableWorkoutId?: string;
};

export const Form: FC<FormPropsType> = ({ clearTemporaryExercise, editableWorkoutId }) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { temporaryExercise } = useContext(Context);

    const userWorkouts = useAppSelector(selectWorkouts);

    const [selectColor, setSelectColor] = useState(() =>
        editableWorkoutId ? userWorkouts[editableWorkoutId].color : workoutColors[0],
    );

    const selectColorHandler = (color: string) => {
        return setSelectColor(color);
    };

    const formik = useFormik({
        initialValues: {
            workoutName: editableWorkoutId ? userWorkouts[editableWorkoutId].workoutName : '',
        },
        validationSchema: createWorkoutScheme,
        onSubmit: (workoutName) => {
            const configUserWorkout = (id: string) => {
                const exercises: { [k: string]: ExerciseInWorkout } = {};
                temporaryExercise.forEach((item) => {
                    exercises[item.id] = item;
                });
                const dataTraining = {
                    ...workoutName,
                    id,
                    color: selectColor,
                    exercises,
                };
                return dataTraining;
            };
            if (editableWorkoutId) {
                const workout: Workout = configUserWorkout(editableWorkoutId);
                dispatch(createOrEditWorkout(workout, 'edit', enqueueSnackbar));
                navigate(ROUTE_PATH.WORKOUT);
            } else {
                const id = uuidv4();
                const workout: Workout = configUserWorkout(id);
                dispatch(createOrEditWorkout(workout, 'create', enqueueSnackbar));
                clearTemporaryExercise();
                selectColorHandler(workoutColors[0]);
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
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#07575b',
                        },
                        '& .MuiInput-root:after': {
                            borderBottom: '2px solid #07575b',
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
                <SelectColor selectColor={selectColor} selectColorHandler={selectColorHandler} />
                <ExerciseList />
            </div>
            <ButtonStandard
                handleClick={() => {}}
                name={editableWorkoutId ? 'Завершить редактирование' : 'Создать тренировку'}
                disabled={temporaryExercise.length === 0}
                type="submit"
            />
        </form>
    );
};
