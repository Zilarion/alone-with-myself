import { observer } from 'mobx-react-lite';

import { HeadquarterPoint } from '../internal';
import styled from '../themed-components';
import { Card } from './Card';
import { StorageSummary } from './StorageSummary';

interface HeadquarterSummaryProps {
    point: HeadquarterPoint;
}

const HeadquarterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.margin.medium};
`;

export const HeadquarterSummary = observer(({ point: { storage } }: HeadquarterSummaryProps) => {
    return (
        <HeadquarterWrapper>
            <Card header="Headquarters">
                { 'This is the spot where you can build your own headquarters.' }
            </Card>
            <Card header="Storage">
                <StorageSummary storage={storage} />
            </Card>
        </HeadquarterWrapper>
    );
});
