import { FC } from 'react';
import cnBind from 'classnames/bind';

import { workoutColors } from '@/constants/constant';

import styles from './index.module.scss';

type SelectColorType = {
    selectColor: string;
    selectColorHandler: (color: string) => void;
};

const cx = cnBind.bind(styles);

export const SelectColor: FC<SelectColorType> = ({ selectColor, selectColorHandler }) => {
    const cn = (color: string) => cx('item', { active: selectColor === color });

    return (
        <div className={styles.wrapper}>
            <span>Цвет тренировки</span>
            <ul className={styles.list}>
                {workoutColors.map((color) => (
                    <li
                        className={cn(color)}
                        key={color}
                        style={{ backgroundColor: color }}
                        onClick={() => selectColorHandler(color)}
                    ></li>
                ))}
            </ul>
        </div>
    );
};
