import TextField from '@mui/material/TextField';
import React from 'react'
type TProps = {
    value: string,
    onChangeHandler: (e: any) => void,
    placeholder: string,
    error: string
}

export const InputText:React.FC<TProps> = ({value, onChangeHandler, placeholder, error}) => {
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