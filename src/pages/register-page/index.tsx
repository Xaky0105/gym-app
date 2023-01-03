import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { ButtonStandard } from '@/components/buttons/button-standard';
import { AuthError } from '@/components/errors/auth-error';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { registerScheme } from '@/scheme';
import { userAuth } from '@/store/user/asyncActions';
import { selectUser, selectUserError, selectUserIsLoading } from '@/store/user/selectors';
import { ROUTE_PATH } from '@/types/other';
import TextField from '@mui/material/TextField';

import styles from './index.module.scss';

type OnClickSubmitFn = (values: { email: string; password: string; name: string }) => void;

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUser);
    const userError = useAppSelector(selectUserError);
    const userIsLoading = useAppSelector(selectUserIsLoading);

    const onClickSubmit: OnClickSubmitFn = ({ email, password, name }) => {
        dispatch(userAuth(email, password, 'register', name));
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerScheme,
        onSubmit: onClickSubmit,
    });

    useEffect(() => {
        if (user) {
            navigate(ROUTE_PATH.CALENDAR);
        }
    });

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.registerWrapper}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <h2>Регистрация</h2>
                    <div className={styles.inputWrapper}>
                        <TextField
                            variant={'standard'}
                            sx={{
                                marginBottom: '20px',
                                '& .MuiFormHelperText-root': {
                                    position: 'absolute',
                                    top: '100%',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#07575b',
                                },
                                '& .MuiInput-root:after': {
                                    borderBottom: '2px solid #07575b',
                                },
                            }}
                            fullWidth
                            id="name"
                            name="name"
                            label="Введите ваше имя"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            variant={'standard'}
                            sx={{
                                marginBottom: '20px',
                                '& .MuiFormHelperText-root': {
                                    position: 'absolute',
                                    top: '100%',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#07575b',
                                },
                                '& .MuiInput-root:after': {
                                    borderBottom: '2px solid #07575b',
                                },
                            }}
                            fullWidth
                            id="email"
                            name="email"
                            label="Введите email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            variant={'standard'}
                            sx={{
                                marginBottom: '20px',
                                '& .MuiFormHelperText-root': {
                                    position: 'absolute',
                                    top: '100%',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#07575b',
                                },
                                '& .MuiInput-root:after': {
                                    borderBottom: '2px solid #07575b',
                                },
                            }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Введите пароль"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            variant={'standard'}
                            sx={{
                                marginBottom: '20px',
                                '& .MuiFormHelperText-root': {
                                    position: 'absolute',
                                    top: '100%',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#07575b',
                                },
                                '& .MuiInput-root:after': {
                                    borderBottom: '2px solid #07575b',
                                },
                            }}
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Подтвердите пароль"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <div className={styles.block}>
                            <p>Уже есть аккаунт?</p>
                            <Link to={ROUTE_PATH.LOGIN}>Войти</Link>
                        </div>
                    </div>
                    <ButtonStandard name="Зарегистрироваться" type={'submit'} isLoading={userIsLoading} />
                    {userError && <AuthError errorMessage={userError} />}
                </form>
            </div>
        </>
    );
};
