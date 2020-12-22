import { IconButton } from '@material-ui/core';
import {
    Add,
    Remove,
} from '@material-ui/icons';

import { observer } from 'mobx-react-lite';

import {
    ResourceSet,
    ResourceType,
    Transporter,
} from '../internal';
import { Card } from './Card';
import { FormattedResource } from './FormattedResource';
import { Table } from './Table';

interface TransporterActionsProps {
    transporter: Transporter;
}

interface ResourceSetSpeedSummaryProps {
    speedOf: (type: ResourceType) => number;
    resources: ResourceSet;
    setSpeed: (type: ResourceType, amount: number) => void;
}
const ResourceSetSpeedSummary = observer(({
    speedOf,
    resources,
    setSpeed,
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
                />/s
            </>,
            <IconButton
                key={0}
                size="small"
                disabled={amount === 0}
                onClick={() => setSpeed(type, Math.max(amount - 1, 0))}
            >
                <Remove />
            </IconButton>,
            <IconButton
                key={1}
                size="small"
                onClick={() => setSpeed(type, amount + 1)}
            >
                <Add />
            </IconButton>,
        ];
    });

    return <Table data={data} />;
});

export const TransporterActions = observer(({
    transporter: {
        speedOf,
        setSpeedPerSecond,
        from,
    },
}: TransporterActionsProps) => {
    return <Card header="Transport route">
        <ResourceSetSpeedSummary
            speedOf={speedOf}
            resources={from.storage.resources}
            setSpeed={setSpeedPerSecond}
        />
    </Card>;

});
