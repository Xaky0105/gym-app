import { FC } from 'react';

import { ButtonStandart } from '@/components/buttons/button-standart';
import { useAppDispatch } from '@/hooks/redux-hook';
import { setConfirmModalIsOpen } from '@/store/modal/slice';

import styles from './index.module.scss';

type DeleteContentType = {
    message: string;
    onOk: () => void;
};

export const DeleteContent: FC<DeleteContentType> = ({ message, onOk }) => {
    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        onOk();
        dispatch(setConfirmModalIsOpen(false));
    };
    return (
        <div className={styles.modal}>
            <p className={styles.message}>{message}</p>
            <div className={styles.btnGroup}>
                <ButtonStandart name="Да" handleClick={onClickHandler} />
                <ButtonStandart name="Нет" handleClick={() => dispatch(setConfirmModalIsOpen(false))} />
            </div>
        </div>
    );
};
