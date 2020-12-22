import { observer } from 'mobx-react-lite';

import { ResourcePoint } from '../internal';
import styled from '../themed-components';
import { Card } from './Card';
import { LabelValue } from './LabelValue';
import { ResourceSetSummary } from './ResourceSetSummary';

interface ResourcePointSummaryProps {
    point: ResourcePoint;
}

const ResourceWrapper = styled.div`
    display: grid;
    grid-gap: ${p => p.theme.margin.medium};
`;

const ResourceInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.margin.small}
`;

export const ResourcePointSummary = observer(({
    point: {
        resources,
        operational,
    },
}: ResourcePointSummaryProps) => {
    const description = operational
        ? 'Resource extraction underway. Recommended to expand harvester fleet and production capabilities.'
        : 'We have identified this as an ideal location to extract resources. Recommended to start resource extraction.';
    return (
        <ResourceWrapper>
            <Card header="Resource point">
                <ResourceInfoWrapper>
                    { description }
                    <LabelValue
                        label="Available Resources"
                        value={
                            <ResourceSetSummary resources={resources.resources} />
                        }
                    />
                </ResourceInfoWrapper>
            </Card>
        </ResourceWrapper>
    );
});
