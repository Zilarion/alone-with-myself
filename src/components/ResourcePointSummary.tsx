import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

import { ResourcePoint } from '../models';
import styled from '../themed-components';
import { Card } from './Card';
import { HarvesterSummary } from './HarvesterSummary';
import { LabelValue } from './LabelValue';
import { StorageSummary } from './StorageSummary';

interface ResourcePointSummaryProps {
    point: ResourcePoint;
}

const ResourceWrapper = styled.div`
    display: grid;
    grid-gap: ${p => p.theme.margin.medium};
`;

export const ResourcePointSummary = observer(({
    point: {
        resources,
        operational,
        storage,
        harvesters,
    },
}: ResourcePointSummaryProps) => {
    return (
        <ResourceWrapper>
            <Card header="Resource point">
                <LabelValue
                    label="Available Resources"
                    value={
                        <StorageSummary storage={resources} />
                    }
                />
            </Card>

            { operational && <>
                <Card header="Storage">
                    <StorageSummary storage={storage} />
                </Card>
                <Card header="Harvesters">
                    <HarvesterSummary harvesters={harvesters} />
                </Card>
            </>}
        </ResourceWrapper>
    );
});
