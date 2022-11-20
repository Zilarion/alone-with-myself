import {
    Box,
    CircularProgress,
    CircularProgressProps,
    Text,
} from '@hope-ui/solid';

interface CircularProgressWithLabelProps extends CircularProgressProps {
    value: number;
}

export const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
    return (
        <Box
            position='relative'
            display='inline-flex'
        >
            <CircularProgress
                // sx={{
                //     color: (theme) =>
                //         theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                // }}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                {...props}
                // sx={{
                //     animationDuration: '550ms',
                //     position: 'absolute',
                //     left: 0,
                //     [`& .${circularProgressClasses.circle}`]: { strokeLinecap: 'round' },
                // }}
                thickness={4}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position={'absolute'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Text
                    // variant="caption"
                    color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Text>
            </Box>
        </Box>
    );
};
