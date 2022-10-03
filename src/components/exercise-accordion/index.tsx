import React, {FC} from 'react'
import { exerciseList } from '../../constants/constant'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Typography from '@mui/material/Typography';
import CheckboxList from './list';
import { Exercise } from '../../types/workout';

type ExerciseAccordionPropsType = {
    temporaryExercise: Exercise[]
    togglerTemporaryExercise: (exercise: Exercise) => void
}

const ExerciseAccordion:FC<ExerciseAccordionPropsType> = ({temporaryExercise, togglerTemporaryExercise}) => {
    const arrKeysOfExerciseList = Object.keys(exerciseList)
    return (
        <>
            {arrKeysOfExerciseList.map((category, i) => (
                <MuiAccordion key={i}>
                    <MuiAccordionSummary 
                        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.9rem'}}/>}
                    >
                        <Typography>{exerciseList[category][0].category}</Typography>
                    </MuiAccordionSummary>
                    <MuiAccordionDetails sx={{padding: 0}}>
                        <CheckboxList 
                            category={category}
                            temporaryExercise={temporaryExercise}
                            togglerTemporaryExercise={togglerTemporaryExercise}
                        />
                    </MuiAccordionDetails>
                </MuiAccordion>
            ))}
        </>
        
    )
}

export default ExerciseAccordion