import * as React from 'react';
import { FC } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { exerciseList } from '../../../constants/constant'
import { Exercise } from '../../../types/workout';
import { isEqualObjects } from '../../../utils/object';

type CheckBoxListPropsType = {
    category: string
    togglerTemporaryExercise: (exercise: Exercise) => void
    temporaryExercise: Exercise[]
}

const CheckboxList:FC<CheckBoxListPropsType> = ({category, togglerTemporaryExercise, temporaryExercise}) => {

    const isChecked = (exercise: Exercise) => !!temporaryExercise.find((ex) => isEqualObjects(ex, exercise))

    return (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {exerciseList[category].map((exercise) => {
                return (
                    <ListItem key={exercise.id} disablePadding>
                        <ListItemButton onClick={() => togglerTemporaryExercise(exercise)} dense>
                            <ListItemIcon>   
                                <Checkbox edge="start" checked={isChecked(exercise)}/>
                            </ListItemIcon>
                            <ListItemText primary={exercise.name} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default CheckboxList