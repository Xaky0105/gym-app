import React from "react";
import { ButtonNav } from '../../buttons/button-nav';
import { navigation } from '../../../constants/constant';
import styles from './index.module.scss'

type NavListPropsType = {
    isActiveNav: boolean
    onClickNavToggler: () => void
}

const NavList:React.FC<NavListPropsType> = ({isActiveNav, onClickNavToggler}) => {
    const cn = isActiveNav ? `${styles.navList} ${styles.active}` : `${styles.navList}`

    return (
        <nav className={cn}>
            {navigation.map((nav, i) => (
                <ButtonNav 
                    key={i}
                    name={nav.name}
                    to={nav.path}
                    callback={onClickNavToggler}
                />
            ))}
        </nav>
    )
}

export default NavList