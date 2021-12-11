import styled from '@emotion/styled';

import { useGame } from '../hooks/useGame';
import { Card } from './Card';
import { SatelliteSummary } from './composites/SatelliteSummary';

const StyledCard = styled(Card)`
    color: ${p => p.theme.palette.primary.main};
    width: 100%;
`;

export const Sidebar = () => {
    const { satellite } = useGame();

    return <StyledCard>
        <SatelliteSummary satellite={satellite} />
    </StyledCard>;
};
