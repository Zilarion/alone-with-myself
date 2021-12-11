import {
    Box,
    CircularProgress,
    circularProgressClasses,
    CircularProgressProps,
    Typography,
} from '@mui/material';

interface CircularProgressWithLabelProps extends CircularProgressProps {
    value: number;
}

export const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
    return (
        <Box sx={{
            position: 'relative',
            display: 'inline-flex',
        }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                {...props}
                sx={{
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: { strokeLinecap: 'round' },
                }}
                thickness={4}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};
