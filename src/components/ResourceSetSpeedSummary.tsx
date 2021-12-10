import {
    Add,
    Remove,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';

import {
    IconButton,
    ResourceSet,
    ResourceType,
} from '../internal';
import { FormattedResource } from './FormattedResource';
import { Table } from './Table';

interface ResourceSetSpeedSummaryProps {
    speedOf: (type: ResourceType) => number;
    resources: ResourceSet;
    setSpeed: (type: ResourceType, amount: number) => void;
    changePerClick: number;
}
export const ResourceSetSpeedSummary = observer(({
    speedOf,
    resources,
    setSpeed,
    changePerClick,
}: ResourceSetSpeedSummaryProps) => {
    const data = resources.map(({ type }) => {
        const amount = speedOf(type);
        return [
            type,
            <>
                <FormattedResource
                    key={type}
                    value={amount}
                    type={type}
                    compact={true}
                />
/s
            </>,
            <IconButton
                key={0}
                size="small"
                label="Remove"
                disabled={amount === 0}
                onClick={() => setSpeed(type, Math.max(amount - changePerClick, 0))}
            >
                <Remove />
            </IconButton>,
            <IconButton
                key={1}
                size="small"
                label="Add"
                onClick={() => setSpeed(type, amount + changePerClick)}
            >
                <Add />
            </IconButton>,
        ];
    });

    return <Table data={data} />;
});
