import React, { FC } from 'react';
import styles from './index.module.scss';
import { Overlay } from '../overlay';
import { Header } from './header';

type CalendarPopupType = {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
};

export const CalendarPopup: FC<CalendarPopupType> = ({ children, onClose, isOpen }) => {
    return (
        <Overlay isOpened={isOpen} onClose={onClose}>
            <div className={styles.modale}>
                <Header />
                {children}
            </div>
        </Overlay>
    );
};
