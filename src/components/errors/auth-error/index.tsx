import { FC } from 'react';

import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

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
        <Fade in={!!errorMessage}>
            <Alert
                variant="outlined"
                sx={{ position: 'absolute', top: '-25%', left: '50%', translate: '-50%', width: '100%' }}
                severity="error"
            >
                {showFormatError()}
            </Alert>
        </Fade>
    );
};
