import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';

type ButtonNavType = {
    name: string;
    to?: string;
    onClick?: () => void;
    icon?: ReactNode;
};

export const ButtonNav: FC<ButtonNavType> = ({ name, to, onClick, icon }) => {
    const navigate = useNavigate();
    const btnClickHandler = () => {
        onClick && onClick();
        to && navigate(to);
    };
    return (
        <button className={styles.btn} onClick={btnClickHandler}>
            {icon && <div className={styles.img}>{icon}</div>}
            <p className={styles.text}>{name}</p>
        </button>
    );
};
