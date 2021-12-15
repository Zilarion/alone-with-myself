import styled from '@emotion/styled';
import {
    BlurOn,
    Explore,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { IconButton } from 'src/internal';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${p => p.theme.spacing(1)};
    align-items: center;
    .active > svg {
        color: ${p => p.theme.palette.secondary.main};
        fill: ${p => p.theme.palette.secondary.main};
    }
    margin-top: 56px;
    flex: auto;
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
            to='satellite'
            label="Location"
            component={NavLink}
            size="large"
        >
            <BlurOn />
        </IconButton>
    </Container>;
};
