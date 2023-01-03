import { FC } from 'react';

import { ButtonStandard } from '@/components/buttons/button-standard';
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
                <ButtonStandard name="Да" handleClick={onClickHandler} />
                <ButtonStandard name="Нет" handleClick={() => dispatch(setConfirmModalIsOpen(false))} />
            </div>
        </div>
    );
};
