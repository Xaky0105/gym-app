import React, { FC, useLayoutEffect, useRef, useState } from 'react';

import { Header } from '@/compound/calendar-popup/header';
import { Overlay } from '@/compound/overlay';
import Slide from '@mui/material/Slide';

import styles from './index.module.scss';

type CalendarPopupType = {
    isOpen: boolean;
    anchorRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    onClose: () => void;
};

const MODAL_WIDTH = 400;
const MODAL_PADDING = 30;

export const CalendarPopup: FC<CalendarPopupType> = ({ children, onClose, isOpen, anchorRef }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

    useLayoutEffect(() => {
        const anchorElement = anchorRef.current;

        if (!isOpen || !anchorElement) {
            return;
        }

        const updatePopupPosition = () => {
            const anchorRect = anchorElement.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            const newPosition = {
                top: anchorRect.top,
                left: anchorRect.left + anchorRect.width + MODAL_PADDING,
            };

            if (newPosition.left + MODAL_WIDTH > windowWidth) {
                newPosition.left = anchorRect.left - MODAL_WIDTH - MODAL_PADDING;
            }

            setPosition(newPosition);
        };

        let rafId: number | null = null;

        const handleResize = () => {
            if (typeof rafId === 'number') {
                return;
            }
            rafId = requestAnimationFrame(() => {
                updatePopupPosition();
                rafId = null;
            });
        };

        updatePopupPosition();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const handleClose = () => {
        onClose();
        setPosition(null);
    };

    const isModalOpened = isOpen && Boolean(position);

    return (
        <Overlay isOpened={isModalOpened} onClose={handleClose}>
            <Slide direction="up" in={isModalOpened} mountOnEnter unmountOnExit>
                <div
                    ref={modalRef}
                    className={styles.modal}
                    style={{ width: MODAL_WIDTH, left: position?.left, top: position?.top }}
                >
                    <Header />
                    {children}
                </div>
            </Slide>
        </Overlay>
    );
};
