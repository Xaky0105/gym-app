import { FC } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import dayjs from 'dayjs';
import { DAY_FORMAT } from '../../../types/day';
import { getSelectedDay } from '../../../store/selectors';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hook';
import { PayloadAction } from '@reduxjs/toolkit';

type HeaderType = {
    setModaleWorkoutIsOpen: (isOpened: boolean) => PayloadAction;
};

export const Header: FC<HeaderType> = ({ setModaleWorkoutIsOpen }) => {
    const daySelected = useAppSelector(getSelectedDay);
    const dispatch = useAppDispatch();
    return (
        <div className={styles.header}>
            <p>{dayjs(daySelected).format(DAY_FORMAT.DD_MM_YYYY)}</p>
            <div
                className={styles.cross}
                onClick={() => {
                    dispatch(setModaleWorkoutIsOpen(false));
                }}
            >
                <MdOutlineClose />
            </div>
        </div>
    );
};
