import styles from './index.module.scss'
import React, { useState } from 'react';
import { Container } from '../../compound/container';
import Burger from './burger';
import NavList from './nav-list';
import UserSetting from './user-setting';
import UserSettingsList from './user-settings-list';

const Header: React.FC = () => {
    const [isActiveNav, setIsActiveNav] = useState(false)
    const [isActiveSettings, setIsActiveSettings] = useState(false)
    const onClickNavToggler = () => {
        setIsActiveNav(!isActiveNav)
    }
    const onCLickSettingsToggler = () => {
        setIsActiveSettings(!isActiveSettings)
    }
    return (
        <>
            <header className={styles.header}>
                <Container>
                    <div className={styles.wrapper}>
                        <Burger 
                            onClickNavToggler={onClickNavToggler}
                            isActiveNav={isActiveNav}
                        />
                        <NavList 
                            onClickNavToggler={onClickNavToggler}
                            isActiveNav={isActiveNav}
                        />
                        <UserSetting 
                            onCLickSettingsToggler={onCLickSettingsToggler}
                            isActiveSettings={isActiveSettings}
                        />
                    </div>
                </Container>
            </header>
            <Container>
                <UserSettingsList 
                    isActiveSettings={isActiveSettings}
                    onCLickSettingsToggler={onCLickSettingsToggler}
                />
            </Container>
        </>
    )
}

export default Header