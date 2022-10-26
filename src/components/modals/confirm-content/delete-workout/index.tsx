import { FC } from 'react';
import { useAppDispatch } from '../../../../hooks/redux-hook';
import { setConfirmModaleIsOpen } from '../../../../store/slices/modaleSlice';
import { ButtonStandart } from '../../../buttons/button-standart';
import styles from './index.module.scss';

type DeleteContentType = {
    message: string;
    onOk: () => void;
};

export const DeleteContent: FC<DeleteContentType> = ({ message, onOk }) => {
    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        onOk();
        dispatch(setConfirmModaleIsOpen(false));
    };
    return (
        <div className={styles.modal}>
            <p className={styles.message}>{message}</p>
            <div className={styles.btnGroup}>
                <ButtonStandart name="Да" handleClick={onClickHandler} />
                <ButtonStandart name="Нет" handleClick={() => dispatch(setConfirmModaleIsOpen(false))} />
            </div>
        </div>
    );
};
