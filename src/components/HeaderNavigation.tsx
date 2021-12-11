import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import { useGame } from '../hooks/useGame';

const Wrapper = styled.div`
    display: flex;
    padding: ${p => p.theme.spacing(2)};
    align-items: center;
    gap: ${p => p.theme.spacing(2)};
    height: 60px;
`;

export const HeaderNavigation = () => {
    const { satellite } = useGame();

    return <Wrapper>
        <Typography variant='h6'>
            {satellite.name}
        </Typography>
    </Wrapper>;
};
