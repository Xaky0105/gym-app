import { BasicExercise, ExerciseInWorkout, ExerciseListType, HOW_TO_CHANGE_EXERCISE } from '@/types/workout';

export type WorkoutState = {
    exerciseList: ExerciseListType;
};

export type ExerciseDataThunk = {
    exercise: ExerciseInWorkout | BasicExercise;
    howToChange: HOW_TO_CHANGE_EXERCISE;
};
