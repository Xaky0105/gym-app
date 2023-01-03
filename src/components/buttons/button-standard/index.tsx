import { FC } from 'react';

import { Preloader } from '@/components/preloader';

import styles from './index.module.scss';

type ButtonStandardPropsType = {
    handleClick?: () => void;
    name: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
};

export const ButtonStandard: FC<ButtonStandardPropsType> = ({ handleClick, name, disabled, type, isLoading }) => {
    return (
        <button
            className={styles.btn}
            onClick={() => handleClick && handleClick()}
            disabled={disabled || isLoading}
            type={type && type}
        >
            {isLoading && (
                <div className={styles.preloaderWrapper}>
                    <Preloader />
                </div>
            )}
            {name}
        </button>
    );
};
