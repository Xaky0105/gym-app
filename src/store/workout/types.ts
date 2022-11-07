import { UserWorkoutsStateType } from '@/types/workout';

export type WorkoutState = {
    userWorkouts: UserWorkoutsStateType;
    isLoading: boolean;
};
