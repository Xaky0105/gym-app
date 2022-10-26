import React from 'react';
import { ButtonNav } from '../../buttons/button-nav';
import styles from './index.module.scss';
import { userSignOut } from '../../../store/asyncActions/userAsyncAction';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hook';
import { workoutsFetchComplete } from '../../../store/slices/workoutSlice';
import { getUserEmail } from '../../../store/selectors';

type UserSettingsListPropsType = {
    isActiveSettings: boolean;
};

export const UserSettingsList: React.FC<UserSettingsListPropsType> = ({ isActiveSettings }) => {
    const dispatch = useAppDispatch();
    const userEmail = useAppSelector(getUserEmail);
    const cn = isActiveSettings ? `${styles.userSettings} ${styles.active}` : `${styles.userSettings}`;
    const onClickSignOut = () => {
        dispatch(userSignOut());
        dispatch(workoutsFetchComplete({}));
    };
    return (
        <div className={cn}>
            <p className={styles.loggedInText}>Вы вошли как:</p>
            <p className={styles.email}>
                <b>{userEmail?.split('@')[0]}</b>
            </p>
            <ul>
                <li>
                    <ButtonNav name={'Выйти'} marginRight={'0px'} onClick={onClickSignOut} />
                </li>
            </ul>
        </div>
    );
};
