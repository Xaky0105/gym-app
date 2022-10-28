import { FC, useContext, useState } from 'react';
import _ from 'lodash';

import { DeleteContent } from '@/components/modals/confirm-content/delete-workout';
import { ConfirmPopup } from '@/compound/confirm-popup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { Context } from '@/pages/create-workout-page';
import { changeExerciseAsync } from '@/store/asyncActions/workoutAsyncAction';
import { getExerciseList, getIsOpenConfirmModale } from '@/store/selectors';
import { setConfirmModaleIsOpen } from '@/store/slices/modaleSlice';
import { ExerciseInWorkout, HOW_TO_CHANGE_EXERCISE } from '@/types/workout';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowDropDownOutlined';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CheckboxList } from './list';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
    ({ theme }) => ({
        marginRight: 10,
        padding: 0,
        borderRadius: 0,
        boxShadow: '0 0 10px 0 #ccc',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 0,
            marginRight: 0,
        },
    }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.8rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: '#f1f3f4',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: '35px',
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(0),
        },
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    borderTop: '2px solid #d1d1d1',
    backgroundColor: 'Highlight',
}));

export const ExerciseAccordion: FC = () => {
    const exerciseList = useAppSelector(getExerciseList);
    const isOpenConfirmModale = useAppSelector(getIsOpenConfirmModale);
    const dispatch = useAppDispatch();

    const [selectExercise, setSelectExercise] = useState<ExerciseInWorkout | null>(null);
    const { temporaryExercise, setTemporaryExerciseHandler } = useContext(Context);

    const onCloseConfirmPopup = () => {
        dispatch(setConfirmModaleIsOpen(false));
    };
    const changeSelectExercise = (exercise: ExerciseInWorkout) => {
        setSelectExercise(exercise);
    };
    const deleteExerciseHandler = () => {
        dispatch(changeExerciseAsync(selectExercise!, HOW_TO_CHANGE_EXERCISE.DELETE));
        if (temporaryExercise.find((ex) => ex.id === selectExercise!.id)) {
            setTemporaryExerciseHandler(selectExercise!);
        }
    };
    return (
        <>
            {_.toArray(exerciseList).map((exercisesGroup) => (
                <Accordion key={exercisesGroup[0].id}>
                    <AccordionSummary>
                        <Typography fontWeight={'bold'}>{exercisesGroup[0].category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                        <CheckboxList exercisesGroup={exercisesGroup} changeSelectExercise={changeSelectExercise} />
                    </AccordionDetails>
                </Accordion>
            ))}
            <ConfirmPopup onClose={onCloseConfirmPopup} isOpened={isOpenConfirmModale}>
                <DeleteContent
                    message={`Вы уверены что хотите удалить упражнение ${selectExercise?.name}?`}
                    onOk={deleteExerciseHandler}
                />
            </ConfirmPopup>
        </>
    );
};
