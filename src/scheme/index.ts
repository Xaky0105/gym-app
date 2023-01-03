import { object, ref, string } from 'yup';

export const createWorkoutScheme = object({
    workoutName: string().min(4, 'Поле должно содержать минимум 4 символа').required('Обязательное поле'),
});

export const loginScheme = object({
    email: string().email('Не корректно введенный email').required('Обязательное поле'),
    password: string().min(8, 'Длина пароля должна быть не менее 8 символов').required('Обязательное поле'),
});

export const registerScheme = object({
    name: string().max(25, 'Длина имени не может быть более 25 символов').required('Обязательное поле'),
    email: string().email('Не корректно введенный email').required('Обязательное поле'),
    password: string().min(8, 'Длина пароля должна быть не менее 8 символов').required('Обязательное поле'),
    confirmPassword: string()
        .oneOf([ref('password')], 'Пароли не совпадают')
        .required('Обязательное поле'),
});

export const reviewScheme = object({
    message: string().max(500, 'Длина отзыва не может быть больше 500 символов').required('Обязательное поле'),
});
