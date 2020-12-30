import { Box } from '@material-ui/core';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { ResourcePoint } from '../internal';
import styled from '../themed-components';
import { Button } from './Button';
import { Card } from './Card';
import { MultipleSelector } from './MultipleSelector';
import { PrintablesList } from './PrintablesList';
import { ResourceSetSummary } from './ResourceSetSummary';

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
        printables,
        activate,
        storage,
        productionPerSecond,
    },
}: ResourcePointActionsProps) => {
    const [ printableCount, setPrintableCount ] = useState(1);
    if (!operational) {
        return <Card header="Available commands">
            <Button onClick={activate}>Initiate mining procedures</Button>
        </Card>;
    }

    return (
        <ResourceActionWrapper>
            <Card header="Printing controls">
                <MultipleSelector value={printableCount} onChange={(n) => setPrintableCount(n)}/>
                <Box m={4} />
                <PrintablesList
                    tasks={availableTasks}
                    printableCount={printableCount}
                    printables={Array.from(printables.values())}
                />
            </Card>
            <Card header="Storage">
                <ResourceSetSummary
                    compact={true}
                    showHeader={true}
                    resources={storage.resources}
                    delta={productionPerSecond}
                />
            </Card>
        </ResourceActionWrapper>
    );
});
