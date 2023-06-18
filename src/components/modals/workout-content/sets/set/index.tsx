import { FC, useState } from 'react';
import cnBind from 'classnames/bind';
import _ from 'lodash';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { VscChromeClose } from 'react-icons/vsc';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { selectExerciseById } from '@/store/exercises/selectors';
import { updateExerciseInWorkoutOnCalendarAsync } from '@/store/workout-on-calendar/asyncActions';
import { SetsType } from '@/types/workout';

import styles from './index.module.scss';

interface IState {
    weight: number;
    amount: number;
    editWeight: boolean;
    editAmount: boolean;
}

type SetProps = {
    set: SetsType;
    index: number;
    removeSet: (setIndex: number) => void;
};

const cx = cnBind.bind(styles);

export const Set: FC<SetProps> = ({ set, index, removeSet }) => {
    const [state, setState] = useState<IState>({
        weight: set.weight,
        amount: set.amount,
        editWeight: false,
        editAmount: false,
    });
    const { weight, amount, editWeight, editAmount } = state;

    const dispatch = useAppDispatch();
    const selectExercise = useAppSelector(selectExerciseById);

    if (!selectExercise) {
        return null;
    }

    const deactivateEditMode = () => {
        const newSets = selectExercise.sets.map((set, i) => (i === index ? { amount, weight } : set));
        const exercise = {
            ...selectExercise,
            sets: newSets,
        };
        if (!_.isEqual(selectExercise, exercise)) {
            dispatch(updateExerciseInWorkoutOnCalendarAsync(exercise));
        }
        setState((prevState) => ({
            ...prevState,
            editWeight: false,
            editAmount: false,
        }));
    };

    const cn = cx('crossWrapper', { disabled: selectExercise.sets.length === 1 });

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
                            onChange={(e) => setState((prevState) => ({ ...prevState, weight: +e.target.value }))}
                            value={weight ? weight : ''}
                            onBlur={deactivateEditMode}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setState({ ...state, editWeight: true })}>
                            {set.weight ? set.weight : '-'}
                        </span>
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
                            onChange={(e) => setState((prevState) => ({ ...prevState, amount: +e.target.value }))}
                            value={amount ? amount : ''}
                            onBlur={deactivateEditMode}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setState({ ...state, editAmount: true })}>
                            {set.amount ? set.amount : '-'}
                        </span>
                    )}
                    {index === 0 && <span className={styles.title}>Кол-во</span>}
                </div>
            </div>
        </li>
    );
};
