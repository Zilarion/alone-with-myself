import styled from '@emotion/styled';
import {
    BlurOn,
    Explore,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

import { IconButton } from '../internal';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${p => p.theme.palette.divider};
    padding: ${p => p.theme.spacing(2)};
    align-items: center;
    .active > svg {
        color: ${p => p.theme.palette.primary.main};
        fill: ${p => p.theme.palette.primary.main};
    }
`;

export const NavigationRail = () => {
    return <Container>
        <IconButton
            to='scanner'
            label="Scanner"
            component={NavLink}
            size="large"
        >
            <Explore />
        </IconButton>

        <IconButton
            to='system'
            label="System"
            component={NavLink}
            size="large"
        >
            <BlurOn />
        </IconButton>
    </Container>;
};
