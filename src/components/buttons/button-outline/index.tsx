import { ChangeEvent, FC } from 'react';
import cnBind from 'classnames/bind';

import styles from './index.module.scss';

type ButtonOutlinePropsType = {
    handleClick: (e?: ChangeEvent<any>) => void;
    text: string;
    color?: 'standard' | 'red';
};

const cx = cnBind.bind(styles);

export const ButtonOutline: FC<ButtonOutlinePropsType> = ({ handleClick, text, color = 'standard' }) => {
    const cn = cx({ standard: color === 'standard', red: color === 'red' });
    return (
        <button className={cn} onClick={handleClick}>
            {text}
        </button>
    );
};
