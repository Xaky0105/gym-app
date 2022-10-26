import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import { ButtonStandart } from '../../components/buttons/button-standart';
import TextField from '@mui/material/TextField';
import { loginSchema } from '../../sheme';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { ROUTE_PATH } from '../../types/route';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { getUser, getUserError, getUserIsLoading } from '../../store/selectors';
import { autoSignIn, loginWithGoogle, userAuth } from '../../store/asyncActions/userAsyncAction';
import { AuthError } from '../../components/errors/auth-error';
import styles from './index.module.scss';

type OnClickSubmitFn = (values: { email: string; password: string }) => void;

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUser);
    const userError = useAppSelector(getUserError);
    const userIsLoading = useAppSelector(getUserIsLoading);

    const onClickSubmit: OnClickSubmitFn = ({ email, password }) => {
        dispatch(userAuth(email, password, 'signin'));
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
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
                        <div onClick={() => dispatch(loginWithGoogle())} className={styles.signInWithGoogle}>
                            <FcGoogle size={30} />
                            <span>Авторизоваться через Google</span>
                        </div>
                    </div>
                </div>
                <ButtonStandart name="Войти" type={'submit'} isloading={userIsLoading} />
                {userError && <AuthError errorMessage={userError} />}
            </form>
        </div>
    );
};
