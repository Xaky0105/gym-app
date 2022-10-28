import { FC, ReactNode } from 'react';

import { Portal } from '@/compound/portal';

import styles from './index.module.scss';

type OverlayType = {
    children: ReactNode;
    onClose: () => void;
    isOpened: boolean;
};

export const Overlay: FC<OverlayType> = ({ children, onClose, isOpened }) => {
    if (!isOpened) {
        return null;
    }

    return (
        <Portal>
            <div className={styles.container}>
                <div className={styles.overlay} onClick={onClose} />
                {children}
            </div>
        </Portal>
    );
};
