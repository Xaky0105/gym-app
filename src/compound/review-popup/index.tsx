import { FC, ReactNode } from 'react';

import { Overlay } from '@/compound/overlay';

import styles from './index.module.scss';

type ReviewPopupType = {
    children: ReactNode;
    isOpened: boolean;
    onClose: () => void;
};

export const ReviewPopup: FC<ReviewPopupType> = ({ children, onClose, isOpened }) => {
    return (
        <Overlay onClose={onClose} isOpened={isOpened}>
            {children}
        </Overlay>
    );
};
