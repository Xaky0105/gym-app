import { FC, useContext, useState } from 'react';
import _ from 'lodash';

import { DeleteContent } from '@/components/modals/confirm-content/delete-content';
import { ConfirmPopup } from '@/compound/confirm-popup';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { Context } from '@/pages/create-workout-page';
import { changeExerciseAsync } from '@/store/exercises/asyncActions';
import { selectExerciseList } from '@/store/exercises/selectors';
import { selectIsOpenConfirmModal } from '@/store/modal/selectors';
import { setConfirmModalIsOpen } from '@/store/modal/slice';
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
        marginBottom: 14,
        padding: 0,
        borderRadius: 5,
        boxShadow: '0px 5px 10px 2px rgba(34, 53, 67, 0.2)',
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            boxShadow: '2px 2px 9px 1px rgba(34, 53, 67, 0.2)',
        },
        '&:before': {
            display: 'none',
        },
    }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.8rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: '#fff',
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
    const exerciseList = useAppSelector(selectExerciseList);
    const isOpenConfirmModal = useAppSelector(selectIsOpenConfirmModal);
    const dispatch = useAppDispatch();

    const [selectExercise, setSelectExercise] = useState<ExerciseInWorkout | null>(null);
    const { temporaryExercise, setTemporaryExerciseHandler } = useContext(Context);

    const onCloseConfirmPopup = () => {
        dispatch(setConfirmModalIsOpen(false));
    };
    const changeSelectExercise = (exercise: ExerciseInWorkout) => {
        setSelectExercise(exercise);
    };
    const deleteExerciseHandler = () => {
        dispatch(changeExerciseAsync({ exercise: selectExercise!, howToChange: HOW_TO_CHANGE_EXERCISE.DELETE }));
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
            <ConfirmPopup onClose={onCloseConfirmPopup} isOpened={isOpenConfirmModal}>
                <DeleteContent
                    message={`Вы уверены что хотите удалить упражнение ${selectExercise?.name}?`}
                    onOk={deleteExerciseHandler}
                />
            </ConfirmPopup>
        </>
    );
};
