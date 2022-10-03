import { ROUTE_PATH } from './../types/route';
import { v4 as uuidv4 } from 'uuid';
import { Exercise } from '../types/workout';
type CategoriesExerciseType = {
    [key: string]: Exercise[]
}

export const navigation = [
    {name: 'Тренировки', path: ROUTE_PATH.WORKOUT},
    {name: 'Календарь', path: ROUTE_PATH.CALENDAR},
    {name: 'Аналитика', path: ROUTE_PATH.ANALYTICS}
]

export const settings = [
    {name: 'Выйти', path: ROUTE_PATH.LOGIN},
]

export const exerciseList: CategoriesExerciseType = {
    legs: [
        {id: uuidv4(), name: 'Приседания со штангой', category: 'Ноги'},
        {id: uuidv4(), name: 'Выпады', category: 'Ноги'},
        {id: uuidv4(), name: 'Сгибания ног', category: 'Ноги'}
    ],
    back: [
        {id: uuidv4(), name: 'Тяга штанги в наклоне', category: 'Спина'},
        {id: uuidv4(), name: 'Шраги со штангой', category: 'Спина'},
        {id: uuidv4(), name: 'Пуловер в тренажере', category: 'Спина'}
    ],
    breast: [
        {id: uuidv4(),  name: 'Жим штанги лёжа', category: 'Грудь'},
        {id: uuidv4(), name: 'Жим штанги лежа - накл', category: 'Грудь'},
        {id: uuidv4(), name: 'Разводка', category: 'Грудь'}
    ],
    shouldres: [
        {id: uuidv4(),  name: 'Жим Гантелей сидя', category: 'Плечи'},
        {id: uuidv4(),  name: 'Армейский жим', category: 'Плечи'},
        {id: uuidv4(),  name: 'Махи гантелей в стороны', category: 'Плечи'},
        {id: uuidv4(),  name: 'Жим Арнольда', category: 'Плечи'},
    ],
    arms: [
        {id: uuidv4(),  name: 'Сгибания рук со штангой', category: 'Руки'},
        {id: uuidv4(),  name: 'Сгибания рук с гантелями', category: 'Руки'},
        {id: uuidv4(),  name: 'Сгибания рук на блоке', category: 'Руки'},
        {id: uuidv4(),  name: 'Сгибания рук с гантелями молотковым хватом', category: 'Руки'},
        {id: uuidv4(),  name: 'Отжимания на брусьях', category: 'Руки'},
    ]
}