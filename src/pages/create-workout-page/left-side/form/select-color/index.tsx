import { FC } from 'react';

import { workoutColors } from '@/constants/constant';

import styles from './index.module.scss';

type SelectColorType = {
    selectColor: string;
    selectColorHandler: (color: string) => void;
};

export const SelectColor: FC<SelectColorType> = ({ selectColor, selectColorHandler }) => {
    const cn = (color: string) => (selectColor === color ? `${styles.item} ${styles.active}` : `${styles.item}`);
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
