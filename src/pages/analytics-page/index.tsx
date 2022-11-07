import { FC, useState } from 'react';
import _ from 'lodash';

import { ContainerTwoPart } from '@/compound/container-two-part';
import { useAppSelector } from '@/hooks/redux-hook';
import { selectWorkoutsForCalendar } from '@/store/workout-on-calendar/selectors';
import { ExerciseInWorkoutOnCalendar } from '@/types/workout';
import { getListOfCompletedExercise } from '@/utils/exercise';

import { LeftSide } from './left-side';
import { RightSide } from './right-side';

export const AnalyticsPage: FC = () => {
    const [selectedExerciseGroup, setSelectedExerciseGroup] = useState<ExerciseInWorkoutOnCalendar[] | null>(null);
    const workoutsForCalendar = useAppSelector(selectWorkoutsForCalendar);
    const exerciseWithData = _.toArray(getListOfCompletedExercise(workoutsForCalendar));

    const selectedExerciseGroupClickHandler = (exercise: ExerciseInWorkoutOnCalendar[]) => {
        setSelectedExerciseGroup(exercise);
    };

    return (
        <ContainerTwoPart>
            <LeftSide
                exerciseWithData={exerciseWithData}
                selectedExerciseGroupClickHandler={selectedExerciseGroupClickHandler}
            />
            <RightSide selectedExerciseGroup={selectedExerciseGroup} />
        </ContainerTwoPart>
    );
};
