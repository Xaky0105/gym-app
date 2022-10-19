import { FC } from 'react';
import { Preloader } from '../../preloader';
import styles from './index.module.scss';

type ButtonStandartPropsType = {
    handleClick?: () => void;
    name: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    isloading?: boolean;
};

export const ButtonStandart: FC<ButtonStandartPropsType> = ({ handleClick, name, disabled, type, isloading }) => {
    return (
        <button
            className={styles.btn}
            onClick={() => handleClick && handleClick()}
            disabled={disabled || isloading}
            type={type && type}
        >
            {isloading && (
                <div className={styles.preloaderWrapper}>
                    <Preloader />
                </div>
            )}
            {name}
        </button>
    );
};
