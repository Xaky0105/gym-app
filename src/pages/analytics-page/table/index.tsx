import dayjs from 'dayjs';
import _ from 'lodash';
import React, { FC } from 'react';
import { DAY_FORMAT } from '../../../types/day';
import { ExerciseInWorkoutOnCalendar } from '../../../types/workout';
import { getSortedExercisesByDate } from '../../../utils/exercise';
import styles from './index.module.scss';

type TableType = {
    selectedExerciseGroup: ExerciseInWorkoutOnCalendar[];
};

export const Table: FC<TableType> = ({ selectedExerciseGroup }) => {
    const sortedExercisesByDate = selectedExerciseGroup && getSortedExercisesByDate(selectedExerciseGroup);

    const sn = (i: number, exercise: ExerciseInWorkoutOnCalendar) =>
        i === _.findLastIndex(exercise.sets) ? `${styles.underline}` : '';

    return (
        <div className={styles.tableWrapper}>
            <table>
                <tbody>
                    <tr>
                        <th>Дата</th>
                        <th>Подход</th>
                        <th>Вес, кг</th>
                        <th>Повторений</th>
                    </tr>
                    {sortedExercisesByDate.map((exercise, i) => (
                        <React.Fragment key={i}>
                            {exercise.sets?.map((set, i) => (
                                <tr key={i}>
                                    {!i && (
                                        <td
                                            className={sn(_.findLastIndex(exercise.sets), exercise)}
                                            rowSpan={_.size(exercise.sets)}
                                        >
                                            {dayjs(exercise.date).format(DAY_FORMAT.DD_MM_YYYY)}
                                        </td>
                                    )}
                                    <td className={sn(i, exercise)}>{i + 1}</td>
                                    <td className={sn(i, exercise)}>{set.weight}</td>
                                    <td className={sn(i, exercise)}>{set.amount}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
