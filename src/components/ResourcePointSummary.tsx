import { observer } from 'mobx-react-lite';
import * as React from 'react';

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
        productionPerSecond,
    },
}: ResourcePointSummaryProps) => {
    const description = operational
        ? 'Resource extraction underway. Recommended to expand harvester fleet and production capabilities.'
        : 'We have identified this as an ideal location to extract resources. Recommended to start resource extraction.';
    return (
        <ResourceWrapper>
            <Card header="Resource point">
                { description }
                <LabelValue
                    label="Available Resources"
                    value={
                        <StorageSummary storage={resources} />
                    }
                />
            </Card>

            { operational && <>
                <Card header="Storage">
                    <StorageSummary
                        showHeader={true}
                        compact={true}
                        storage={storage}
                        delta={productionPerSecond}
                    />
                </Card>
                <Card header="Harvesters">
                    <HarvesterSummary harvesters={harvesters} />
                </Card>
            </>}
        </ResourceWrapper>
    );
});
