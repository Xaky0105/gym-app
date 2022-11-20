import React, { FC } from 'react';
import cnBind from 'classnames/bind';
import dayjs from 'dayjs';
import _ from 'lodash';

import { DAY_FORMAT } from '@/types/other';
import { ExerciseInWorkoutOnCalendar } from '@/types/workout';
import { getExerciseTonnage, getSortedExercisesByDate } from '@/utils/exercise';

import styles from './index.module.scss';

type TableType = {
    selectedExerciseGroup: ExerciseInWorkoutOnCalendar[];
};

const cx = cnBind.bind(styles);

export const Table: FC<TableType> = ({ selectedExerciseGroup }) => {
    const sortedExercisesByDate = selectedExerciseGroup && getSortedExercisesByDate(selectedExerciseGroup);

    const cn = (i: number, exercise: ExerciseInWorkoutOnCalendar) =>
        cx({ underline: i === _.findLastIndex(exercise.sets) });
    return (
        <div className={styles.tableWrapper}>
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Подход</th>
                        <th>Вес, кг</th>
                        <th>Повторений</th>
                        <th>Тоннаж, т</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExercisesByDate.map((exercise, i) => (
                        <React.Fragment key={i}>
                            {exercise.sets?.map((set, i) => (
                                <tr key={i}>
                                    {!i && (
                                        <td
                                            className={cn(_.findLastIndex(exercise.sets), exercise)}
                                            rowSpan={_.size(exercise.sets)}
                                        >
                                            {dayjs(exercise.date).format(DAY_FORMAT.DD_MM_YYYY)}
                                        </td>
                                    )}
                                    <td className={cn(i, exercise)}>{i + 1}</td>
                                    <td className={cn(i, exercise)}>{set.weight}</td>
                                    <td className={cn(i, exercise)}>{set.amount}</td>
                                    {!i && (
                                        <td
                                            className={cn(_.findLastIndex(exercise.sets), exercise)}
                                            rowSpan={_.size(exercise.sets)}
                                        >
                                            {getExerciseTonnage(exercise).toFixed(2)}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
