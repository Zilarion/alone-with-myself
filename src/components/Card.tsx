import styled from '@emotion/styled';
import { CardContent } from '@mui/material';
import { FC } from 'react';

const StyledCard = styled.div`
    background: ${p => p.theme.palette.background.default};
    box-shadow: 0 0 1px ${p => p.theme.palette.primary.main};
    padding: ${p => p.theme.spacing(2)}px;
`;

export const Card: FC = ({ children }) => {
    return <StyledCard>
        <CardContent>
            { children }
        </CardContent>
    </StyledCard>;
};
