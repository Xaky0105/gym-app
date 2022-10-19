import { FC } from 'react';
import { ButtonNav } from '../../buttons/button-nav';
import { navigation } from '../../../constants/constant';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.scss';

type NavListPropsType = {
    isActiveNav: boolean;
    onClickNavToggler: () => void;
};

export const MobileNavList: FC<NavListPropsType> = ({ isActiveNav, onClickNavToggler }) => {
    const cn = isActiveNav ? `${styles.navList} ${styles.active}` : `${styles.navList}`;
    return (
        <nav className={cn}>
            <ul>
                {navigation.map((nav) => (
                    <li key={uuidv4()}>
                        <ButtonNav name={nav.name} to={nav.path} onClick={onClickNavToggler} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};
