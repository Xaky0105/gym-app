import { FC, ReactNode } from 'react';

import styles from './index.module.scss';

type LeftType = {
    children: ReactNode;
    title: string;
};

export const Left: FC<LeftType> = ({ children, title }) => {
    return (
        <div className={styles.left}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </div>
    );
};
