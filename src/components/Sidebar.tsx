import styled from '@emotion/styled';

import { useGame } from '../hooks/useGame';
import { Card } from './Card';
import { SystemSummary } from './composites/SystemSummary';

const StyledCard = styled(Card)`
    color: ${p => p.theme.palette.primary.main};
    width: 100%;
`;

export const Sidebar = () => {
    const { system } = useGame();

    return <StyledCard>
        <SystemSummary system={system} />
    </StyledCard>;
};
