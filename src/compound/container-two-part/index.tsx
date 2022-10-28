import { FC, ReactNode } from 'react';

import { Container } from '@/compound/container';

import styles from './index.module.scss';

type ContainerTwoPartType = {
    children: ReactNode;
};

export const ContainerTwoPart: FC<ContainerTwoPartType> = ({ children }) => {
    return (
        <Container>
            <div className={styles.wrapper}>{children}</div>
        </Container>
    );
};
