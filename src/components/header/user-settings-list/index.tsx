import React from 'react';
import { TbSettings } from 'react-icons/tb';
import { VscSignOut } from 'react-icons/vsc';

import { ButtonNav } from '@/components/buttons/button-nav';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { userSignOut } from '@/store/asyncActions/userAsyncAction';
import { getUserName } from '@/store/selectors';
import { workoutsFetchComplete } from '@/store/slices/workoutSlice';

import styles from './index.module.scss';

type UserSettingsListPropsType = {
    isActiveSettings: boolean;
};

export const UserSettingsList: React.FC<UserSettingsListPropsType> = ({ isActiveSettings }) => {
    const dispatch = useAppDispatch();
    const userEmail = useAppSelector(getUserName);
    const cn = isActiveSettings ? `${styles.userSettings} ${styles.active}` : `${styles.userSettings}`;
    const onClickSignOut = () => {
        dispatch(userSignOut());
        dispatch(workoutsFetchComplete({}));
    };
    return (
        <div className={cn}>
            <p className={styles.loggedInText}>Вы вошли как:</p>
            <p className={styles.email}>
                <b>{userEmail}</b>
            </p>
            <ul>
                <li>
                    <ButtonNav name={'Настройки'} icon={<TbSettings size={22} />} />
                </li>
                <li>
                    <ButtonNav name={'Выйти'} onClick={onClickSignOut} icon={<VscSignOut size={22} />} />
                </li>
            </ul>
        </div>
    );
};
