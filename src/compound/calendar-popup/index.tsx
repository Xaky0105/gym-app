import React, { FC } from 'react';

import { Header } from '@/compound/calendar-popup/header';
import { Overlay } from '@/compound/overlay';

import styles from './index.module.scss';

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
