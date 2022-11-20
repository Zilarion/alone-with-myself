import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { ResourceIndicator } from '../../../components/ResourceIndicator';
import { Satellite } from '../../../models/Satellite';

interface LocationSummaryProps {
    satellite: Satellite;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.spacing(2)}px;
`;

export const SatelliteSummary = observer(({ satellite }: LocationSummaryProps) => {
    return <Wrapper>
        {satellite.storage.resources.map(resource => {
            return <ResourceIndicator
                key={resource.type}
                resource={resource}
            />;
        })}
    </Wrapper>;
});
