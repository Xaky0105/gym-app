import { FC } from 'react';

import styles from './index.module.scss';

type ContainerPropsType = {
    children: React.ReactNode;
};

export const Container: FC<ContainerPropsType> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};
