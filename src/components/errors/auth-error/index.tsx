import { FC } from 'react';
import styles from './index.module.scss';

type AuthErrorPropsType = {
    errorMessage: string;
};

export const AuthError: FC<AuthErrorPropsType> = ({ errorMessage }) => {
    const showFormatError = () => {
        switch (errorMessage) {
            case 'Firebase: Error (auth/user-not-found).':
                return 'Неверный логин или пароль';
            case 'Firebase: Error (auth/wrong-password).':
                return 'Неверный логин или пароль';
            case 'Firebase: Error (auth/email-already-in-use).':
                return 'Этот email уже используется';
            default:
                return 'Что-то пошло не так';
        }
    };
    return (
        <div className={styles.error}>
            <p className={styles.message}>{showFormatError()}</p>
        </div>
    );
};
