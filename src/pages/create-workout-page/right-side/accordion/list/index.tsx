import { FC } from 'react';

import { ExerciseInWorkout } from '@/types/workout';
import List from '@mui/material/List';

import { Item } from './item';

type CheckBoxListPropsType = {
    exercisesGroup: ExerciseInWorkout[];
    changeSelectExercise: (exercise: ExerciseInWorkout) => void;
};

export const CheckboxList: FC<CheckBoxListPropsType> = ({ exercisesGroup, changeSelectExercise }) => {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'background.paper',
            }}
            disablePadding
        >
            <>
                {exercisesGroup.map((exercise, index) => (
                    <Item
                        key={exercise.id}
                        index={index}
                        exercisesGroup={exercisesGroup}
                        exercise={exercise}
                        changeSelectExercise={changeSelectExercise}
                    />
                ))}
            </>
        </List>
    );
};
