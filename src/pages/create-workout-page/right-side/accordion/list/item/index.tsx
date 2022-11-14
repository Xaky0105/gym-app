import { FC, useContext, useState } from 'react';
import cnBind from 'classnames/bind';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti';
import { VscCheck } from 'react-icons/vsc';

import { useAppDispatch } from '@/hooks/redux-hook';
import { Context } from '@/pages/create-workout-page';
import { changeExerciseAsync } from '@/store/exercises/asyncActions';
import { setConfirmModalIsOpen } from '@/store/modal/slice';
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

const cx = cnBind.bind(styles);

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
            dispatch(setConfirmModalIsOpen(true));
        }
    };

    const createExerciseHandler = async () => {
        const exerciseData: BasicExercise = {
            ...exercise,
            id: uuidv4(),
            name: createInputValue,
        };
        if (createInputValue.length) {
            await dispatch(changeExerciseAsync({ exercise: exerciseData, howToChange: HOW_TO_CHANGE_EXERCISE.CREATE }));
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
            dispatch(changeExerciseAsync({ exercise: updatedExercise, howToChange: HOW_TO_CHANGE_EXERCISE.UPDATE }));
        }
        editToggler();
    };

    const closeCn = cx('iconWrapper', { disabled: isEdit || exercisesGroup.length === 1 });
    const pencilCn = cx('iconWrapper', { disabled: isChecked() });

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
                        <span className={pencilCn} onClick={editToggler}>
                            <TiPencil />
                        </span>
                    )}

                    <span className={closeCn} onClick={onClickDeleteIcon}>
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
