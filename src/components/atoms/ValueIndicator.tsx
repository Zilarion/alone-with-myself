import {
    LinearProgress,
    Typography,
} from '@mui/material';

import { CurrentMaxValue } from './CurrentMaxValue';

interface ValueIndicatorProps {
    value: number;
    max: number;
    label: string;
}
const normalise = (value: number, max: number) => (value * 100) / (max);

export const ValueIndicator = ({
    value,
    max,
    label,
}: ValueIndicatorProps) => {
    return <>
        <Typography color="primary">
            {label}
        </Typography>
        <LinearProgress
            color="primary"
            variant="determinate"
            value={normalise(value, max)}
        />
        <CurrentMaxValue
            value={value}
            max={max}
        />
    </>;
};
