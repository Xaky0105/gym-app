import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import ButtonStandart from '../../components/buttons/button-standart';
import TextField from '@mui/material/TextField';
import { registerSchema } from '../../sheme'
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../types/route';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { userAuth } from '../../store/actions/asyncAction';
import { getUser, getUserError, getUserIsLoading } from '../../store/selectors';
import styles from './index.module.scss'
import { AuthError } from '../../components/errors/auth-error';

type OnClickSubmitFn = (values: {email: string, password: string}) => void

export const RegisterPage:FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const user = useAppSelector(getUser)
    const userError = useAppSelector(getUserError)
    const userIsLoading = useAppSelector(getUserIsLoading)

    const onClickSubmit: OnClickSubmitFn = ({email, password}) => {
        dispatch(userAuth(email, password, 'register'))
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: registerSchema,
        onSubmit: onClickSubmit,
    });

    useEffect(() => {
        if (user) {
            navigate(ROUTE_PATH.CALENDAR)
        }
    })

    return (
        <div className={styles.registerWrapper}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <h2>Регистрация</h2>
                <div className={styles.inputWrapper}>
                    <TextField
                        variant={'standard'}
                        sx={{marginBottom: '20px','& .MuiFormHelperText-root': { position: 'absolute', top: '100%' }}}
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
                        sx={{marginBottom: '20px','& .MuiFormHelperText-root': { position: 'absolute', top: '100%' }}}
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
                        sx={{marginBottom: '20px','& .MuiFormHelperText-root': { position: 'absolute', top: '100%' }}}
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
                <ButtonStandart 
                    name='Зарегистрироваться'
                    type={'submit'}
                    isloading={userIsLoading}
                />
                {userError && <AuthError errorMessage={userError}/>}
            </form>
        </div>
    );
};
