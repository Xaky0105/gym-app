import { FC } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Typography from '@mui/material/Typography';
import { CheckboxList } from './list';
import { Exercise } from '../../types/workout';
import { useAppSelector } from '../../hooks/redux-hook';
import { getExerciseList } from '../../store/selectors';
import _ from 'lodash';
import { styled } from '@mui/material/styles';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
    ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        marginBottom: 15,
        marginRight: 10,
        padding: 0,
        borderRadius: 6,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 0,
            marginRight: 0,
        },
    }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.8rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
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
    borderTop: '2px solid rgba(0, 0, 0, .125)',
}));

type ExerciseAccordionPropsType = {
    temporaryExercise: Exercise[];
    togglerTemporaryExercise: (exercise: Exercise) => void;
};

export const ExerciseAccordion: FC<ExerciseAccordionPropsType> = ({ temporaryExercise, togglerTemporaryExercise }) => {
    const exerciseList = useAppSelector(getExerciseList);
    return (
        <>
            {_.toArray(exerciseList).map((exercisesGroup) => (
                <Accordion key={exercisesGroup[0].id}>
                    <AccordionSummary>
                        <Typography>{exercisesGroup[0].category}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                        <CheckboxList
                            exercisesGroup={exercisesGroup}
                            temporaryExercise={temporaryExercise}
                            togglerTemporaryExercise={togglerTemporaryExercise}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};
