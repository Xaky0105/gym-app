import React from 'react';
import { TbArrowBackUp } from 'react-icons/tb';

import { ButtonNav } from '@/components/buttons/button-nav';
import { ROUTE_PATH } from '@/types/other';

import styles from './index.module.scss';

export const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2>404 NOT FOUND</h2>
            <ButtonNav name="Вернуться на главную" to={ROUTE_PATH.CALENDAR} icon={<TbArrowBackUp />} />
        </div>
    );
};
