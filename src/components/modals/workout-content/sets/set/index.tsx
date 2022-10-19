import _ from 'lodash';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux-hook';
import { updateExerciseAsync } from '../../../../../store/asyncActions/workoutAsyncAction';
import { getExerciseById } from '../../../../../store/selectors';
import { SetsType } from '../../../../../types/workout';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { VscChromeClose } from 'react-icons/vsc';
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
    const selectExercise = useAppSelector(getExerciseById);

    const deactivateEditMode = () => {
        const newSets = selectExercise.sets!.map((set, i) => (i === index ? { amount, weight } : set));
        const exercise = {
            ...selectExercise,
            sets: newSets,
        };
        if (!_.isEqual(selectExercise, exercise)) {
            dispatch(updateExerciseAsync(exercise));
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
    return (
        <li className={styles.block}>
            <div className={styles.groupLeft}>
                <div className={styles.crossWrapper}>
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
