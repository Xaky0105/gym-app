import { BsCalendar3 } from 'react-icons/bs';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';

import { ROUTE_PATH } from '@/types/other';
import { BasicExercise } from '@/types/workout';

export type basicExerciseListType = {
    [key: string]: BasicExercise[];
};

export const navigation = [
    { name: 'Календарь', path: ROUTE_PATH.CALENDAR, icon: <BsCalendar3 size={20} /> },
    { name: 'Тренировки', path: ROUTE_PATH.WORKOUT, icon: <MdOutlineFitnessCenter size={20} /> },
    { name: 'Аналитика', path: ROUTE_PATH.ANALYTICS, icon: <TbDeviceAnalytics size={20} /> },
];

export const workoutColors = ['#a9d5ce', '#f0cbcb', '#e1d5f0', '#b9e4f4', '#EAE7DC'];

export const basicExerciseList: basicExerciseListType = {
    legs: [
        { id: uuidv4(), name: 'Приседания со штангой', category: 'Ноги' },
        { id: uuidv4(), name: 'Выпады', category: 'Ноги' },
        { id: uuidv4(), name: 'Сгибания ног', category: 'Ноги' },
    ],
    back: [
        { id: uuidv4(), name: 'Тяга штанги в наклоне', category: 'Спина' },
        { id: uuidv4(), name: 'Шраги со штангой', category: 'Спина' },
        { id: uuidv4(), name: 'Пуловер в тренажере', category: 'Спина' },
    ],
    breast: [
        { id: uuidv4(), name: 'Жим штанги лёжа', category: 'Грудь' },
        { id: uuidv4(), name: 'Жим штанги лежа - накл', category: 'Грудь' },
        { id: uuidv4(), name: 'Разводка', category: 'Грудь' },
    ],
    shoulders: [
        { id: uuidv4(), name: 'Жим Гантелей сидя', category: 'Плечи' },
        { id: uuidv4(), name: 'Армейский жим', category: 'Плечи' },
        { id: uuidv4(), name: 'Махи гантелей в стороны', category: 'Плечи' },
        { id: uuidv4(), name: 'Жим Арнольда', category: 'Плечи' },
    ],
    arms: [
        { id: uuidv4(), name: 'Сгибания рук со штангой', category: 'Руки' },
        { id: uuidv4(), name: 'Сгибания рук с гантелями', category: 'Руки' },
        { id: uuidv4(), name: 'Сгибания рук на блоке', category: 'Руки' },
        {
            id: uuidv4(),
            name: 'Сгибания рук с гантелями молотковым хватом',
            category: 'Руки',
        },
        { id: uuidv4(), name: 'Отжимания на брусьях', category: 'Руки' },
    ],
    core: [
        { id: uuidv4(), name: 'Скручивания', category: 'Пресс' },
        { id: uuidv4(), name: 'Прямая планка', category: 'Пресс' },
        { id: uuidv4(), name: 'Боковая планка', category: 'Пресс' },
        { id: uuidv4(), name: 'Подъем ног', category: 'Пресс' },
    ],
};
