

import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ResourcePoint } from '../models';
import styled from '../themed-components';
import { Button } from './Button';
import { Card } from './Card';
import { LabelValue } from './LabelValue';
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
    },
}: ResourcePointActionsProps) => {
    if (!operational) {
        return <Card header="Available commands">
            <Button onClick={activate}>Initiate mining procedures</Button>
        </Card>;
    }

    return (
        <ResourceActionWrapper>
            <Card header="Printer information">
                <LabelValue
                    label={'Printers'}
                    value={printers.amount.toFixed(0)}
                />
            </Card>
            <Card header="Printer management">
                <TaskSummary tasks={availableTasks} />
            </Card>
        </ResourceActionWrapper>
    );
});
