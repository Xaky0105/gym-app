import React from "react";
import styles from './index.module.scss'

type UserSettingsPropsType = {
    onCLickSettingsToggler: () => void
    isActiveSettings: boolean
}

const UserSetting:React.FC<UserSettingsPropsType> = ({onCLickSettingsToggler}) => {
    return (
        <div 
            className={styles.user}
            onClick={onCLickSettingsToggler}
        >
            <img src="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png" alt="user"/>
        </div>
        
    )
}

export default UserSetting