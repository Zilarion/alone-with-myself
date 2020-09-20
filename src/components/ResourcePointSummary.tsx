import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ResourcePoint } from '../models';
import { Header } from './Header';
import { LabelValue } from './LabelValue';

interface ResourcePointSummaryProps {
    point: ResourcePoint;
}

export const ResourcePointSummary = observer(({ point: { resources } }: ResourcePointSummaryProps) => {
    return (
        <div>
            <Header>Resource point</Header>
            <LabelValue
                label="Resources"
                value={`${ resources.toFixed(0) } kg`}
            />
        </div>
    );
});
