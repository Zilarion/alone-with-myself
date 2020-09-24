import { observer } from 'mobx-react-lite';
import * as React from 'react';

import {
    ResourcePoint,
    ResourceType,
} from '../models';
import styled from '../themed-components';
import { emptyArray } from '../util';
import { Button } from './Button';
import { Card } from './Card';
import { LabelValue } from './LabelValue';

interface ResourcePointActionsProps {
    point: ResourcePoint;
}

const Box = styled.div`
    border: 1px solid green;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 2px;
`;

export const ResourcePointActions = observer(({
    point: {
        miners,
        printers,
        operational,
        activate,
        printMiner,
        totalQueueLength,
        storage,
    },
}: ResourcePointActionsProps) => {
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
                value={`${ printers.length } printer(s) operational`}
            />
            <div>
                {emptyArray(totalQueueLength).map((_, idx) =>
                    <Box style={{ height: `${ idx === 0 ? 10 - printers[0].taskProgress * 10 : 10}px` }} key={idx} />,
                )}
            </div>

            <Button>Print printer</Button>
        </>
    ) : (
        <>
            <Button onClick={activate}>Initiate mining procedures</Button>
        </>
    );

    return (
        <Card header="Resource point">
            { content }
        </Card>
    );
});
