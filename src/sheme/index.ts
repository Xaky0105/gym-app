import { object, ref, string } from 'yup';

export const createWorkoutSchema = object({
    workoutName: string().min(4, 'Поле должно содержать минимум 4 символа').required('Обязательное поле'),
});

const a = ['123', '123'];

export const loginSchema = object({
    email: string()
        .email('Не корректно введенный email')
        .notOneOf(a, 'Такой эмейл уже есть')
        .required('Необходимо заполнить поле'),
    password: string().min(8, 'Длина пароля должна быть не менее 8 символов').required('Необходимо заполнить поле'),
});

export const registerSchema = object({
    email: string().email('Не корректно введенный email').required('Необходимо заполнить поле'),
    password: string().min(8, 'Длина пароля должна быть не менее 8 символов').required('Необходимо заполнить поле'),
    confirmPassword: string()
        .oneOf([ref('password')], 'Пароли не совпадают')
        .required('Необходимо заполнить поле'),
});
