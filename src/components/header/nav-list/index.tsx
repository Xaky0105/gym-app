import { FC } from 'react';

import { ButtonNav } from '@/components/buttons/button-nav';
import { navigation } from '@/constants/constant';

import styles from './index.module.scss';

export const NavList: FC = () => {
    return (
        <nav className={styles.navList}>
            {navigation.map((nav, i) => (
                <ButtonNav key={i} name={nav.name} to={nav.path} icon={nav.icon} />
            ))}
        </nav>
    );
};
