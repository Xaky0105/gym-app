import { FC } from 'react'
import TextField from '@mui/material/TextField';

type InputTextProps = {
    value: string,
    onChangeHandler: (e: any) => void,
    placeholder: string,
    error: string
}

export const InputText:FC<InputTextProps> = ({value, onChangeHandler, placeholder, error}) => {
    return (
        <TextField
            id="standard-textarea"
            label={placeholder}
            variant="standard"
            value={value}
            onChange={onChangeHandler}
            fullWidth
            error={Boolean(error)}
        />
    );
}