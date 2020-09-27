import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ResourcePoint } from '../models';
import styled from '../themed-components';
import { Button } from './Button';
import { Card } from './Card';
import { PrinterSummary } from './PrinterSummary';
import { QueueSummary } from './QueueSummary';

interface ResourcePointActionsProps {
    point: ResourcePoint;
}

const ResourceActionWrapper = styled.div`
    display: grid;
    grid-gap: ${p => p.theme.margin.medium};
`;

export const ResourcePointActions = observer(({
    point: {
        availableActions,
        printers,
        queue,
        operational,
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
            <Card header="Available commands">
                { availableActions.map(({
                    onClick,
                    enabled,
                    label,
                }) =>
                    <Button key={label}
                        onClick={() => onClick()}
                        disabled={!enabled}
                    >{ label }</Button>,
                )}
            </Card>
            <Card header="Printer queue">
                <QueueSummary queue={queue} />
            </Card>
            <Card header="Printer summary">
                <PrinterSummary printers={printers} />
            </Card>
        </ResourceActionWrapper>
    );
});
