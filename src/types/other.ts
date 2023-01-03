import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

export enum DAY_FORMAT {
    YYYY_MM_DD = 'YYYY-MM-DD',
    DD_MM_YYYY = 'DD/MM/YYYY',
}

export enum STEP_MODAL {
    WORKOUTS = 'WORKOUTS',
    CHOICE_WORKOUTS = 'CHOICE_WORKOUTS',
    EXERCISES = 'EXERCISES',
    SETS = 'SETS',
}

export type Coordinates = {
    x: number;
    y: number;
};

export type Dimensions = {
    width: number;
    height: number;
};

export interface IReview {
    name: string;
    rating: number;
    img: string;
    createdAccountAt: string;
    createdReviewAt: string;
    message: string;
    id: string;
}

export enum ROUTE_PATH {
    CALENDAR = '/calendar',
    WORKOUT = '/workout',
    CREATE_WORKOUT = '/create-workout',
    ANALYTICS = '/analytics',
    LOGIN = '/',
    REGISTER = '/register',
    SETTINGS = '/settings',
    REVIEWS = '/reviews',
    EDIT_WORKOUT = '/edit-workout',
    NOT_FOUND = '*',
}

export type EnqueueSnackbar = (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
