import { FC, ReactNode } from 'react';

import { Overlay } from '@/compound/overlay';

type ConfirmPopupType = {
    children: ReactNode;
    isOpened: boolean;
    onClose: () => void;
};

export const ConfirmPopup: FC<ConfirmPopupType> = ({ children, onClose, isOpened }) => {
    return (
        <Overlay onClose={onClose} isOpened={isOpened}>
            {children}
        </Overlay>
    );
};
