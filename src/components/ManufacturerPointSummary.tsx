import { observer } from 'mobx-react-lite';

import { ManufacturerPoint } from '../internal';
import styled from '../themed-components';
import { Card } from './Card';

interface ManufacturerPointSummaryProps {
    point: ManufacturerPoint;
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

export const ManufacturerPointSummary = observer(({ point: { operational } }: ManufacturerPointSummaryProps) => {
    const description = operational
        ? 'Resource manufacturing underway. Recommended to expand manufacturing facilities.'
        : 'We have identified this as an ideal location to commence resource manufacturing.';
    return (
        <ResourceWrapper>
            <Card header="Manufacturing facility">
                <ResourceInfoWrapper>
                    { description }
                </ResourceInfoWrapper>
            </Card>
        </ResourceWrapper>
    );
});
