import { observer } from 'mobx-react-lite';

import { ResourcePoint } from '../internal';
import styled from '../themed-components';
import { Button } from './Button';
import { Card } from './Card';
import { PrintableSummary } from './PrintableSummary';
import { StorageSummary } from './StorageSummary';

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
    if (!operational) {
        return <Card header="Available commands">
            <Button onClick={activate}>Initiate mining procedures</Button>
        </Card>;
    }

    return (
        <ResourceActionWrapper>
            <Card header="Printing controls">
                <PrintableSummary
                    tasks={availableTasks} 
                    printables={Array.from(printables.values())}
                />
            </Card>
            <Card header="Storage">
                <StorageSummary
                    compact={true}
                    showHeader={true}
                    storage={storage}
                    delta={productionPerSecond}
                />
            </Card>
        </ResourceActionWrapper>
    );
});
