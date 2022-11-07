import { FC, useState } from 'react';
import _ from 'lodash';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { VscChromeClose } from 'react-icons/vsc';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectExerciseById } from '@/store/exercises/selectors';
import { updateExerciseInWorkoutOnCalendarAsync } from '@/store/workout-on-calendar/asyncActions';
import { SetsType } from '@/types/workout';

import styles from './index.module.scss';

type TSetProps = {
    set: SetsType;
    index: number;
    removeSet: (setIndex: number) => void;
};

export const Set: FC<TSetProps> = ({ set, index, removeSet }) => {
    const [editWeight, setEditWeight] = useState(false);
    const [editAmount, setEditAmount] = useState(false);
    const [weight, setWeight] = useState(set.weight);
    const [amount, setAmount] = useState(set.amount);
    const inputWeightValue = weight ? weight : '';
    const inputAmountValue = amount ? amount : '';

    const dispatch = useAppDispatch();
    const selectExercise = useAppSelector(selectExerciseById);

    const deactivateEditMode = () => {
        const newSets = selectExercise.sets.map((set, i) => (i === index ? { amount, weight } : set));
        const exercise = {
            ...selectExercise,
            sets: newSets,
        };
        if (!_.isEqual(selectExercise, exercise)) {
            dispatch(updateExerciseInWorkoutOnCalendarAsync(exercise));
        }
        setEditWeight(false);
        setEditAmount(false);
    };
    const onWeightChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setWeight((prevWeight) => (prevWeight = Number(value)));
    };
    const onAmountChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setAmount((prevAmont) => (prevAmont = Number(value)));
    };
    const cn = selectExercise.sets.length > 1 ? `${styles.crossWrapper}` : `${styles.crossWrapper} ${styles.disabled}`;
    return (
        <li className={styles.block}>
            <div className={styles.groupLeft}>
                <div className={cn}>
                    <AiOutlineCloseSquare
                        size={20}
                        onClick={() => {
                            removeSet(index);
                        }}
                    />
                </div>
                <div>Подход {index + 1}</div>
            </div>
            <div className={styles.groupRight}>
                <div className={styles.inputWrapper}>
                    {editWeight ? (
                        <input
                            type="number"
                            onChange={onWeightChange}
                            value={inputWeightValue}
                            onBlur={deactivateEditMode}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setEditWeight(true)}>{set.weight ? set.weight : '-'}</span>
                    )}
                    {index === 0 && <span className={styles.title}>Вес, кг</span>}
                </div>
                <span>
                    <VscChromeClose size={15} />
                </span>
                <div className={styles.inputWrapper}>
                    {editAmount ? (
                        <input
                            type="number"
                            onChange={onAmountChange}
                            value={inputAmountValue}
                            onBlur={deactivateEditMode}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setEditAmount(true)}>{set.amount ? set.amount : '-'}</span>
                    )}
                    {index === 0 && <span className={styles.title}>Кол-во</span>}
                </div>
            </div>
        </li>
    );
};
