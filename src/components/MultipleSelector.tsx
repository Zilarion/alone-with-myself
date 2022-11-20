import {
    Button,
    ButtonGroup,
    Grid,
} from '@hope-ui/solid';
import { Accessor } from 'solid-js';

interface MultipleSelector {
    value: Accessor<number>;
    onChange: (value: number) => void;
}

export const MultipleSelector = ({
    value,
    onChange,
}: MultipleSelector) => {
    return <Grid
        alignItems="center"
    >
        <ButtonGroup>
            <Button
                variant={value() === 1 ? 'solid' : 'outline'}
                onClick={() => onChange(1)}
            >
                1
            </Button>
            <Button
                variant={value() === 10 ? 'solid' : 'outline'}
                onClick={() => onChange(10)}
            >
                10
            </Button>
            <Button
                variant={value() === 100 ? 'solid' : 'outline'}
                onClick={() => onChange(100)}
            >
                100
            </Button>
            <Button
                variant={value() === 1000 ? 'solid' : 'outline'}
                onClick={() => onChange(1000)}
            >
                1K
            </Button>
        </ButtonGroup>
    </Grid >;
};
