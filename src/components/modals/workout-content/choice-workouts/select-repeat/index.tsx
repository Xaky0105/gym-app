import { FC } from 'react';

import { HOW_TO_REPEAT } from '@/types/workout';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectRepeatProps = {
    howToRepeatCLickHandler: (repeat: HOW_TO_REPEAT) => void;
    howToRepeat: HOW_TO_REPEAT;
};

type HowToRepeatType = {
    name: string;
    type: HOW_TO_REPEAT;
};

const howToRepeatData: HowToRepeatType[] = [
    { name: 'Не повторять', type: HOW_TO_REPEAT.DONT_REPEAT },
    { name: 'Каждый день', type: HOW_TO_REPEAT.EVERY_DAY },
    { name: 'С интервалом', type: HOW_TO_REPEAT.INTERVAL },
    { name: 'Каждую неделю', type: HOW_TO_REPEAT.ONCE_A_WEEK },
];

export const SelectRepeat: FC<SelectRepeatProps> = ({ howToRepeatCLickHandler, howToRepeat }) => {
    const handleChange = (e: SelectChangeEvent) => {
        howToRepeatCLickHandler(e.target.value as HOW_TO_REPEAT);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1.5, minWidth: 120, maxWidth: 140 }} size="small">
            <InputLabel id="select-small">Повторы</InputLabel>
            <Select
                labelId="select-small"
                id="select-small"
                value={howToRepeat}
                label="HowToRepeat"
                onChange={handleChange}
                sx={{ fontSize: '14px' }}
            >
                {howToRepeatData.map((repeat) => (
                    <MenuItem key={repeat.type} value={repeat.type} sx={{ fontSize: '14px' }}>
                        {repeat.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
