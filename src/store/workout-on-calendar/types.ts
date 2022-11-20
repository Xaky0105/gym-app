import { UserWorkoutsStateType } from '@/types/workout';

export type WorkoutCalendarState = {
    workoutsOnTheCalendar: UserWorkoutsStateType;
    isLoading: boolean;
};
