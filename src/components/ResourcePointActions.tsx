

import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ResourcePoint } from '../models';
import styled from '../themed-components';
import { Button } from './Button';
import { Card } from './Card';
import { HarvesterSummary } from './HarvesterSummary';
import { LabelValue } from './LabelValue';
import { StorageSummary } from './StorageSummary';
import { TaskSummary } from './TaskSummary';

interface ResourcePointActionsProps {
    point: ResourcePoint;
}

const ResourceActionWrapper = styled.div`
    display: grid;
    grid-gap: ${p => p.theme.margin.medium};
`;

export const ResourcePointActions = observer(({
    point: {
        availableTasks,
        operational,
        printers,
        activate,
        harvesters,
        storage,
        productionPerSecond,
    },
}: ResourcePointActionsProps) => {
    if (!operational) {
        return <Card header="Available commands">
            <Button onClick={activate}>Initiate mining procedures</Button>
        </Card>;
    }

    return (
        <ResourceActionWrapper>
            <Card header="Printer management">
                <LabelValue
                    label={'Printers'}
                    value={printers.amount.toFixed(0)}
                />
                <TaskSummary tasks={availableTasks} />
            </Card>
            <Card header="Storage">
                <StorageSummary
                    compact={true}
                    showHeader={true}
                    storage={storage}
                    delta={productionPerSecond}
                />
            </Card>
            <Card header="Harvesters">
                <HarvesterSummary harvesters={harvesters} />
            </Card>
        </ResourceActionWrapper>
    );
});
