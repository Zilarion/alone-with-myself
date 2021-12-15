import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useGame } from '../hooks/useGame';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';

const Wrapper = styled.div`
    display: flex;
    padding: ${p => p.theme.spacing(2)};
    align-items: center;
    vertical-align: center;
    gap: ${p => p.theme.spacing(2)};
    height: 60px;
`;

const Splitter = styled.div`
    background: ${p => p.theme.palette.primary.main};
    width: 1px;
    height: 30px;
    margin: ${p => p.theme.spacing(2)};
`;

export const HeaderNavigation = observer(() => {
    const { satellite } = useGame();

    return <Wrapper>
        <Typography variant='h6'>
            {satellite.name}
        </Typography>

        <Splitter />
        <Typography>
            Explored area
        </Typography>
        <CircularProgressWithLabel
            variant="determinate"
            size={30}
            value={satellite.exploredArea / satellite.totalArea}
        />
    </Wrapper>;
});
