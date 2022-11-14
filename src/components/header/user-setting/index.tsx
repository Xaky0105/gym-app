import { FC } from 'react';
import cnBind from 'classnames/bind';

import { UserSettingsList } from '@/components/header/user-settings-list';
import { useAppSelector } from '@/hooks/redux-hook';
import { selectUserPhotoByName } from '@/store/user/selectors';

import styles from './index.module.scss';

type UserSettingsPropsType = {
    onCLickSettingsToggler: () => void;
    isActiveSettings: boolean;
};

const cx = cnBind.bind(styles);

export const UserSetting: FC<UserSettingsPropsType> = ({ onCLickSettingsToggler, isActiveSettings }) => {
    const userPhoto = useAppSelector(selectUserPhotoByName);
    const cn = cx('user', { active: isActiveSettings });
    return (
        <div className={cn}>
            <img src={userPhoto} alt="user" onClick={onCLickSettingsToggler} />
            <UserSettingsList isActiveSettings={isActiveSettings} onCLickSettingsToggler={onCLickSettingsToggler} />
        </div>
    );
};
