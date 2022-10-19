import { FC } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type SelectNumberProps = {
    repeatClickHandler: (repeatValue: number) => void;
    repeatInterval: number;
};

type IntervalDataType = {
    name: string;
    value: number;
};

const intervalData: IntervalDataType[] = [
    { name: '1 день', value: 1 },
    { name: '2 дня', value: 2 },
    { name: '3 дня', value: 3 },
    { name: '4 дня', value: 4 },
    { name: '5 дней', value: 5 },
    { name: '6 дней', value: 6 },
    { name: '7 дней', value: 7 },
    { name: '8 дней', value: 8 },
    { name: '9 дней', value: 9 },
];

export const SelectNumber: FC<SelectNumberProps> = ({ repeatClickHandler, repeatInterval }) => {
    const handleChange = (event: any) => {
        repeatClickHandler(event.target.value);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1.5, minWidth: 120, maxWidth: 140 }} size="small">
            <InputLabel id="select-number">Интервал</InputLabel>
            <Select
                labelId="select-number"
                id="select-number"
                value={repeatInterval}
                label="SelectNumber"
                onChange={handleChange}
                type={'number'}
                sx={{ fontSize: '14px' }}
            >
                {intervalData.map((interval) => (
                    <MenuItem key={interval.name} value={interval.value} sx={{ fontSize: '14px' }}>
                        {interval.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
