import { FC } from 'react';

import { ButtonNav } from '@/components/buttons/button-nav';
import { navigation } from '@/constants/constant';

import styles from './index.module.scss';

export const NavList: FC = () => {
    return (
        <nav className={styles.navList}>
            {navigation.map((nav, i) => (
                <div key={i} className={styles.btnWrapper}>
                    <ButtonNav name={nav.name} to={nav.path} icon={nav.icon} />
                </div>
            ))}
        </nav>
    );
};
