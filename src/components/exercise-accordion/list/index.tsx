import { FC } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Exercise } from '../../../types/workout';

type CheckBoxListPropsType = {
    exercisesGroup: Exercise[]
    togglerTemporaryExercise: (exercise: Exercise) => void
    temporaryExercise: Exercise[]
}

const CheckboxList:FC<CheckBoxListPropsType> = ({exercisesGroup, togglerTemporaryExercise, temporaryExercise}) => {

    const isChecked = (exercise: Exercise) => {
        return !!temporaryExercise.find((ex) => ex.id === exercise.id)
    }

    return (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {exercisesGroup.map((exercise) => {
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