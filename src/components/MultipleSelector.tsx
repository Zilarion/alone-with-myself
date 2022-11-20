import {
    Button,
    ButtonGroup,
    Grid,
} from '@hope-ui/solid';

interface MultipleSelector {
    value: number;
    onChange: (value: number) => void;
}

export const MultipleSelector = (props: MultipleSelector) => {
    return <Grid
        alignItems="center"
    >
        <ButtonGroup>
            <Button
                variant={props.value === 1 ? 'solid' : 'outline'}
                onClick={() => props.onChange(1)}
            >
                1
            </Button>
            <Button
                variant={props.value === 10 ? 'solid' : 'outline'}
                onClick={() => props.onChange(10)}
            >
                10
            </Button>
            <Button
                variant={props.value === 100 ? 'solid' : 'outline'}
                onClick={() => props.onChange(100)}
            >
                100
            </Button>
            <Button
                variant={props.value === 1000 ? 'solid' : 'outline'}
                onClick={() => props.onChange(1000)}
            >
                1K
            </Button>
        </ButtonGroup>
    </Grid >;
};
