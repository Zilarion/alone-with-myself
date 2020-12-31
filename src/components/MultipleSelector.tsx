import {
    Grid,
    Input,
} from '@material-ui/core';
import {
    ToggleButton,
    ToggleButtonGroup,
} from '@material-ui/lab';

import { observer } from 'mobx-react-lite';
import {
    useEffect,
    useState,
} from 'react';

import { assert } from '../internal';

interface MultipleSelector {
    value: number;
    onChange: (value: number) => void;
}

export const MultipleSelector = observer(({
    value: initialValue,
    onChange,
}: MultipleSelector) => {
    const [ value, setValue ] = useState(initialValue);
    const [ customValue, setCustomValue ] = useState<undefined | number>();
    const [ type, setType ] = useState('1');

    useEffect(() => {
        onChange(value);
    }, [ value, onChange ]);

    const handleChange = (_: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment === '1') {
            setValue(1);
            setType('1');
        } else if (newAlignment === '10') {
            setValue(10);
            setType('10');
        }else if (newAlignment === '100') {
            setValue(100);
            setType('100');
        }else if (newAlignment === '1k') {
            setValue(1000);
            setType('1k');
        } else if (newAlignment === 'custom') {
            assert(customValue != null, 'Expected custom value to exist.');
            setValue(customValue);
            setType('custom');
        }
    };



    const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseInt(event.target.value);
        setCustomValue(newValue);
        setType('custom');

        if (type === 'custom') {
            setValue(newValue);
        }
    };

    return <Grid
        container
        alignItems="center"
    >
        <ToggleButtonGroup
            size="small"
            value={type}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton size='small' value={'1'}>
                1
            </ToggleButton>
            <ToggleButton size='small' value={'10'}>
                10
            </ToggleButton>
            <ToggleButton size='small' value={'100'}>
                100
            </ToggleButton>
            <ToggleButton size='small' value={'1k'}>
                1K
            </ToggleButton>
            <ToggleButton size='small' value="custom">
                <Input
                    type='number'
                    fullWidth
                    value={customValue}
                    onChange={handleCustomChange}
                />
            </ToggleButton>
        </ToggleButtonGroup>
    </Grid>;
})
;
