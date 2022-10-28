import { FC, ReactNode } from 'react';

import styles from './index.module.scss';

type RightType = {
    children: ReactNode;
    title: string;
};

export const Right: FC<RightType> = ({ children, title }) => {
    return (
        <div className={styles.right}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </div>
    );
};
