import React from "react";
import { ButtonNav } from '../../buttons/button-nav';
import styles from './index.module.scss'
import { userSignOut } from "../../../store/actions/asyncAction";
import { useAppDispatch } from "../../../hooks/redux-hook";
import { workoutsFetchComplete } from "../../../store/workoutSlice";

type UserSettingsListPropsType = {
    onCLickSettingsToggler: () => void
    isActiveSettings: boolean
}

const UserSettingsList:React.FC<UserSettingsListPropsType> = ({isActiveSettings, onCLickSettingsToggler}) => {
    const dispatch = useAppDispatch()
    const cn = isActiveSettings ? `${styles.userSettings} ${styles.active}` : `${styles.userSettings}`
    const onClickSignOut = () => {
        dispatch(userSignOut())
        dispatch(workoutsFetchComplete({}))
    }
    return (
        <div 
            className={cn}
            onClick={onCLickSettingsToggler}
        > 
            <ButtonNav 
                name={'Выйти'}
                marginRight={'0px'}
                onClick={onClickSignOut}
            />
        </div>
    )
}

export default UserSettingsList

