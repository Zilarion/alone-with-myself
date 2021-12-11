import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { Satellite } from '../../internal';
import { ValueIndicator } from '../atoms/ValueIndicator';

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
        <ValueIndicator
            value={satellite.exploredArea}
            max={satellite.totalArea}
            label="Area"
        />
        {satellite.resources.map(resource => {
            return <ValueIndicator
                key={resource.type}
                value={resource.amount}
                max={resource.amount}
                label={resource.type}
            />;
        })}
    </Wrapper>;
});
