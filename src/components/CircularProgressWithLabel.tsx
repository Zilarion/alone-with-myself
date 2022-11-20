import {
    CircularProgress,
    CircularProgressIndicator,
    CircularProgressLabel,
    CircularProgressProps,
} from '@hope-ui/solid';

interface CircularProgressWithLabelProps extends CircularProgressProps {
    value: number;
}

export const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
    return (
        <CircularProgress
            value={Math.floor(props.value)}
        >
            <CircularProgressIndicator color="$primary9" />
            <CircularProgressLabel />
        </CircularProgress>
    );
};
