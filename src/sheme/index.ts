import { object, string } from 'yup';

export const createWorkoutSchema = object({
    workoutName: string()
    .min(4, 'Поле должно содержать минимум 4 символа')
    .required('Обязательное поле'),
});