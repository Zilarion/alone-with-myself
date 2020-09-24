import { observer } from 'mobx-react-lite';
import * as React from 'react';

import {
    ResourcePoint,
    ResourceType,
} from '../models';
import styled from '../themed-components';
import { Button } from './Button';
import { Card } from './Card';
import { LabelValue } from './LabelValue';
import { PrinterSummary } from './PrinterSummary';

interface ResourcePointActionsProps {
    point: ResourcePoint;
}

const ResourceActionWrapper = styled.div`
    display: grid;
    grid-gap: ${p => p.theme.margin.medium};
`;

export const ResourcePointActions = observer(({
    point: {
        miners,
        printers,
        operational,
        activate,
        printMiner,
        printPrinter,
        storage,
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
                <LabelValue
                    label="Miners"
                    value={`${ miners } miner(s) operational`}
                />
                <Button
                    onClick={printMiner}
                    disabled={!storage.has(ResourceType.minerals, 10)}
                >Print miner</Button>

                <LabelValue
                    label="Printers"
                    value={`${ printers.length } printer(s) operational`}
                />
                <Button
                    onClick={printPrinter}
                    disabled={!storage.has(ResourceType.minerals, 50)}
                >Print printer</Button>
            </Card>
            <Card header="Printer summary">
                <PrinterSummary printers={printers} />
            </Card>
        </ResourceActionWrapper>
    );
});
