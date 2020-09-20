import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ResourcePoint } from '../models';
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
    },
}: ResourcePointSummaryProps) => {
    const content = operational ? (
        <>
            <LabelValue
                label="Miners"
                value={`${ miners } miner(s) operational`}
            />
            <Button>Print miner</Button>

            <LabelValue
                label="Printers"
                value={`${ printers } printer(s) operational`}
            />

            <Button>Print printer</Button>
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
