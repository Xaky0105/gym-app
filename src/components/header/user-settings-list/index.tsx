import React from "react";
import { ButtonNav } from '../../buttons/button-nav';
import { settings } from '../../../constants/constant';
import styles from './index.module.scss'

type UserSettingsListPropsType = {
    onCLickSettingsToggler: () => void
    isActiveSettings: boolean
}

const UserSettingsList:React.FC<UserSettingsListPropsType> = ({isActiveSettings, onCLickSettingsToggler}) => {
    const cn = isActiveSettings ? `${styles.userSettings} ${styles.active}` : `${styles.userSettings}`
    return (
        <div 
            className={cn}
            onClick={onCLickSettingsToggler}
        >
            {settings.map((setting, i) => (
                <ButtonNav 
                    key={i}
                    name={setting.name}
                    to={setting.path}
                />
            ))}
        </div>
    )
}

export default UserSettingsList

