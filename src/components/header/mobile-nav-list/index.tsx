import { FC } from 'react';
import cnBind from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import { ButtonNav } from '@/components/buttons/button-nav';
import { navigation } from '@/constants/constant';

import styles from './index.module.scss';

type NavListPropsType = {
    isActiveNav: boolean;
    onClickNavToggler: () => void;
};

const cx = cnBind.bind(styles);

export const MobileNavList: FC<NavListPropsType> = ({ isActiveNav, onClickNavToggler }) => {
    const cn = cx('navList', { active: isActiveNav });
    return (
        <nav className={cn}>
            <ul>
                {navigation.map((nav) => (
                    <li key={uuidv4()}>
                        <ButtonNav name={nav.name} to={nav.path} onClick={onClickNavToggler} icon={nav.icon} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};
