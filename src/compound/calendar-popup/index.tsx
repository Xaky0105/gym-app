import React, { FC, RefObject, useRef } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { Header } from '@/compound/calendar-popup/header';
import { Overlay } from '@/compound/overlay';
import { useComponentCoordinates } from '@/hooks/useComponentCoordinates';
import { useComponentSize } from '@/hooks/useComponentSize';
import { useWindowSize } from '@/hooks/useWondowSize';
import { getCalendarPopupCoordinates } from '@/utils/modal';
import Slide from '@mui/material/Slide';

import styles from './index.module.scss';

type CalendarPopupType = {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    currentDayRef: RefObject<any> | null;
    monthRef: RefObject<any>;
};

export const CalendarPopup: FC<CalendarPopupType> = ({ children, onClose, isOpen, currentDayRef, monthRef }) => {
    const ref = useRef<HTMLDivElement>(null);

    const monthSize = useComponentSize(monthRef);
    const modalSize = useComponentSize(ref);
    const dayCoordinates = useComponentCoordinates(currentDayRef);
    const windowSize = useWindowSize();

    const modalPosition = getCalendarPopupCoordinates({
        monthSize,
        modalSize,
        dayCoordinates,
        windowSize,
    });

    return (
        <Overlay isOpened={isOpen} onClose={onClose}>
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <div className={styles.modale} style={{ left: modalPosition.x, top: modalPosition.y }} ref={ref}>
                    <Header />
                    {children}
                </div>
            </Slide>
        </Overlay>
    );
};
