import { FC, useContext, useState } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti';
import { VscCheck } from 'react-icons/vsc';

import { useAppDispatch } from '@/hooks/redux-hook';
import { Context } from '@/pages/create-workout-page';
import { changeExerciseAsync } from '@/store/asyncActions/workoutAsyncAction';
import { setConfirmModaleIsOpen } from '@/store/slices/modaleSlice';
import { BasicExercise, ExerciseInWorkout, HOW_TO_CHANGE_EXERCISE } from '@/types/workout';
import { uuidv4 } from '@firebase/util';
import { Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import styles from './index.module.scss';

type ItemType = {
    exercisesGroup: ExerciseInWorkout[];
    exercise: ExerciseInWorkout;
    index: number;
    changeSelectExercise: (exercise: ExerciseInWorkout) => void;
};

export const Item: FC<ItemType> = ({ exercisesGroup, exercise, index, changeSelectExercise }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isCreateExercise, setIsCreateExercise] = useState(false);
    const [editInputValue, setEditInputValue] = useState(exercise.name);
    const [createInputValue, setCreateInputValue] = useState('');

    const { temporaryExercise, setTemporaryExerciseHandler } = useContext(Context);

    const dispatch = useAppDispatch();

    const editToggler = () => {
        if (!isChecked()) {
            setIsEdit(!isEdit);
        }
    };

    const createExerciseToggler = () => {
        setIsCreateExercise(!isCreateExercise);
    };

    const onClickDeleteIcon = () => {
        if (!isEdit && exercisesGroup.length !== 1) {
            changeSelectExercise(exercise);
            dispatch(setConfirmModaleIsOpen(true));
        }
    };

    const createExerciseHandler = async () => {
        const exerciseData: BasicExercise = {
            ...exercise,
            id: uuidv4(),
            name: createInputValue,
        };
        if (createInputValue.length) {
            await dispatch(changeExerciseAsync(exerciseData, HOW_TO_CHANGE_EXERCISE.CREATE));
            createExerciseToggler();
        } else {
            createExerciseToggler();
        }
    };

    const isChecked = () => {
        return !!temporaryExercise.find((ex) => ex.id === exercise.id);
    };

    const updateExerciseHandler = () => {
        if (editInputValue !== exercise.name) {
            const updatedExercise: BasicExercise = {
                ...exercise,
                name: editInputValue,
            };
            console.log(updatedExercise);
            dispatch(changeExerciseAsync(updatedExercise, HOW_TO_CHANGE_EXERCISE.UPDATE));
        }
        editToggler();
    };

    const closeCN = () => (isEdit || exercisesGroup.length === 1 ? `${styles.disabled}` : '');
    const pencilCN = () => (isChecked() ? `${styles.disabled}` : '');
    return (
        <>
            <div className={styles.listItem}>
                <div className={styles.leftGroup}>
                    <Checkbox
                        edge="start"
                        checked={isChecked()}
                        onClick={() => setTemporaryExerciseHandler(exercise)}
                        disabled={isEdit}
                        sx={{
                            marginRight: '10px',
                            color: '#87b6bc',
                            '&.Mui-checked': {
                                color: '#87b6bc',
                            },
                            '&.Mui-disabled': {
                                color: '#ccc',
                            },
                        }}
                    />
                    {isEdit ? (
                        <TextField
                            variant={'standard'}
                            fullWidth
                            autoFocus
                            value={editInputValue}
                            onChange={(e) => setEditInputValue(e.target.value)}
                            onBlur={editToggler}
                            color="success"
                        />
                    ) : (
                        <p className={styles.text}>{exercise.name}</p>
                    )}
                </div>
                <div className={styles.rightGroup}>
                    {isEdit ? (
                        <span className={styles.iconWrapper} onMouseDown={updateExerciseHandler}>
                            <VscCheck />
                        </span>
                    ) : (
                        <span className={`${styles.iconWrapper} ${pencilCN()}`} onClick={editToggler}>
                            <TiPencil />
                        </span>
                    )}

                    <span className={`${styles.iconWrapper} ${closeCN()}`} onClick={onClickDeleteIcon}>
                        <MdClose />
                    </span>
                </div>
            </div>
            {index === exercisesGroup.length - 1 && (
                <div className={styles.listItem}>
                    {isCreateExercise ? (
                        <>
                            {createInputValue.length ? (
                                <div className={styles.iconContainer} onMouseDown={createExerciseHandler}>
                                    <VscCheck />
                                </div>
                            ) : (
                                <div className={styles.iconContainer} onMouseDown={createExerciseHandler}>
                                    <MdClose />
                                </div>
                            )}
                            <TextField
                                variant={'standard'}
                                fullWidth
                                autoFocus
                                value={createInputValue}
                                onChange={(e) => setCreateInputValue(e.target.value)}
                                onBlur={createExerciseToggler}
                                color="success"
                                placeholder="Введите название упражнения"
                            />
                        </>
                    ) : (
                        <Tooltip title="Добавьте своё упражнение" disableInteractive enterDelay={500} leaveDelay={200}>
                            <div className={styles.iconContainer} onClick={createExerciseToggler}>
                                <BsPlusSquareDotted />
                            </div>
                        </Tooltip>
                    )}
                </div>
            )}
        </>
    );
};
