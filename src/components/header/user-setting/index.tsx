import { FC } from 'react';
import { useAppSelector } from '../../../hooks/redux-hook';
import { getUserPhotoByEmail } from '../../../store/selectors';
import styles from './index.module.scss';

type UserSettingsPropsType = {
    onCLickSettingsToggler: () => void;
    isActiveSettings: boolean;
};

export const UserSetting: FC<UserSettingsPropsType> = ({ onCLickSettingsToggler }) => {
    const userPhoto = useAppSelector(getUserPhotoByEmail);
    return (
        <div className={styles.user} onClick={onCLickSettingsToggler}>
            <img src={userPhoto} alt="user" />
        </div>
    );
};
