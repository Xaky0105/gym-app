import React from 'react';
import cnBind from 'classnames/bind';
import { MdOutlineReviews } from 'react-icons/md';
import { TbSettings } from 'react-icons/tb';
import { VscSignOut } from 'react-icons/vsc';

import { ButtonNav } from '@/components/buttons/button-nav';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { userSignOut } from '@/store/user/asyncActions';
import { selectUserName } from '@/store/user/selectors';
import { workoutsFetchComplete } from '@/store/workout/slice';
import { ROUTE_PATH } from '@/types/route';

import styles from './index.module.scss';

type UserSettingsListPropsType = {
    isActiveSettings: boolean;
    onCLickSettingsToggler: () => void;
};

const cx = cnBind.bind(styles);

export const UserSettingsList: React.FC<UserSettingsListPropsType> = ({ isActiveSettings, onCLickSettingsToggler }) => {
    const dispatch = useAppDispatch();
    const userEmail = useAppSelector(selectUserName);

    const onClickSignOut = () => {
        dispatch(userSignOut());
        dispatch(workoutsFetchComplete({}));
    };

    const cn = cx('userSettings', { active: isActiveSettings });

    return (
        <div className={cn}>
            <p className={styles.loggedInText}>Вы вошли как:</p>
            <p className={styles.email}>
                <b>{userEmail}</b>
            </p>
            <ul>
                <li>
                    <ButtonNav
                        name={'Настройки'}
                        to={ROUTE_PATH.SETTINGS}
                        onClick={onCLickSettingsToggler}
                        icon={<TbSettings size={22} />}
                    />
                </li>
                <li>
                    <ButtonNav
                        name={'Отзывы'}
                        to={ROUTE_PATH.REVIEWS}
                        onClick={onCLickSettingsToggler}
                        icon={<MdOutlineReviews size={22} />}
                    />
                </li>
                <li>
                    <ButtonNav name={'Выйти'} onClick={onClickSignOut} icon={<VscSignOut size={22} />} />
                </li>
            </ul>
        </div>
    );
};
