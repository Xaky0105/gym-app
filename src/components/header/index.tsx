import { FC, useState } from 'react';
import { Container } from '../../compound/container';
import { Burger } from './burger';
import { NavList } from './nav-list';
import { UserSetting } from './user-setting';
import { UserSettingsList } from './user-settings-list';
import { MobileNavList } from './mobile-nav-list';
import styles from './index.module.scss';

export const Header: FC = () => {
    const [isActiveNav, setIsActiveNav] = useState(false);
    const [isActiveSettings, setIsActiveSettings] = useState(false);

    const onClickNavToggler = () => {
        setIsActiveNav(!isActiveNav);
    };
    const onCLickSettingsToggler = () => {
        setIsActiveSettings(!isActiveSettings);
    };
    const maskClickHandler = () => {
        if (isActiveNav) {
            onClickNavToggler();
        } else if (isActiveSettings) {
            onCLickSettingsToggler();
        }
    };
    return (
        <>
            <header className={styles.header}>
                <Container>
                    <div className={styles.wrapper}>
                        <Burger onClickNavToggler={onClickNavToggler} isActiveNav={isActiveNav} />
                        <NavList />
                        <div className={styles.block}>
                            <UserSetting
                                onCLickSettingsToggler={onCLickSettingsToggler}
                                isActiveSettings={isActiveSettings}
                            />
                        </div>
                    </div>
                </Container>
            </header>
            <MobileNavList onClickNavToggler={onClickNavToggler} isActiveNav={isActiveNav} />
            {(isActiveNav || isActiveSettings) && <div className={styles.mask} onClick={maskClickHandler}></div>}
        </>
    );
};
