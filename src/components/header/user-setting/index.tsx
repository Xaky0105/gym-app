import { FC } from 'react';
import { useAppSelector } from '../../../hooks/redux-hook';
import { getUserPhotoByEmail } from '../../../store/selectors';
import { UserSettingsList } from '../user-settings-list';
import styles from './index.module.scss';

type UserSettingsPropsType = {
    onCLickSettingsToggler: () => void;
    isActiveSettings: boolean;
};

export const UserSetting: FC<UserSettingsPropsType> = ({ onCLickSettingsToggler, isActiveSettings }) => {
    const userPhoto = useAppSelector(getUserPhotoByEmail);
    return (
        <div className={styles.user}>
            <img src={userPhoto} alt="user" onClick={onCLickSettingsToggler} />
            <UserSettingsList isActiveSettings={isActiveSettings} />
        </div>
    );
};
