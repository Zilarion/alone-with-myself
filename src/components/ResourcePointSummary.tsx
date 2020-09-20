import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ResourcePoint } from '../models';
import { ResourceType } from '../models/ResourceStorage';
import { Button } from './Button';
import { Header } from './Header';
import { LabelValue } from './LabelValue';

interface ResourcePointSummaryProps {
    point: ResourcePoint;
}

export const ResourcePointSummary = observer(({
    point: {
        resources,
        miners,
        printers,
        operational,
        activate,
        printMiner,
        storage,
    },
}: ResourcePointSummaryProps) => {
    const content = operational ? (
        <>
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
                value={`${ printers } printer(s) operational`}
            />

            <Button>Print printer</Button>


            <LabelValue
                label="Mineral storage"
                value={`${ storage.numberOf(ResourceType.minerals).toFixed(0) } kg`}
            />
        </>
    ) : (
        <>
            <Button onClick={activate}>Initiate mining procedures</Button>
        </>
    );
    return (
        <div>
            <Header>Resource point</Header>
            <LabelValue
                label="Resources"
                value={`${ resources.toFixed(0) } kg`}
            />
            { content }
        </div>
    );
});
