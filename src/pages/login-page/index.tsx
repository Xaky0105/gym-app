import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import { ButtonStandard } from '@/components/buttons/button-standard';
import { AuthError } from '@/components/errors/auth-error';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { loginScheme } from '@/scheme';
import { autoSignIn, loginWithGoogle, userAuth } from '@/store/user/asyncActions';
import { selectUser, selectUserError, selectUserIsLoading } from '@/store/user/selectors';
import { ROUTE_PATH } from '@/types/other';
import TextField from '@mui/material/TextField';

import styles from './index.module.scss';

type OnClickSubmitFn = (values: { email: string; password: string }) => void;

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUser);
    const userError = useAppSelector(selectUserError);
    const userIsLoading = useAppSelector(selectUserIsLoading);

    const onClickSubmit: OnClickSubmitFn = ({ email, password }) => {
        dispatch(userAuth(email, password, 'signIn'));
    };

    const loginWithGoogleHandler = () => {
        if (!userIsLoading) {
            dispatch(loginWithGoogle());
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginScheme,
        onSubmit: onClickSubmit,
    });

    useEffect(() => {
        if (user) {
            navigate(ROUTE_PATH.CALENDAR);
        }
    });

    useEffect(() => {
        dispatch(autoSignIn());
    }, []);

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.loginWrapper}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <h2>Войти</h2>
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
                            id="email"
                            name="email"
                            label="Email"
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
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <div className={styles.block}>
                            <p>Нет аккаунта ?</p>
                            <Link to={ROUTE_PATH.REGISTER}>Зарегистрироваться</Link>
                            <p>или</p>
                            <div onClick={loginWithGoogleHandler} className={styles.signInWithGoogle}>
                                <FcGoogle size={30} />
                                <span>Авторизоваться через Google</span>
                            </div>
                        </div>
                    </div>
                    <ButtonStandard name="Войти" type={'submit'} isLoading={userIsLoading} />
                    {userError && <AuthError errorMessage={userError} />}
                </form>
            </div>
        </>
    );
};
