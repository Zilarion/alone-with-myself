import styled from '@emotion/styled';
import {
    Card as MuiCard,
    CardContent,
    Typography,
} from '@mui/material';
import { FC } from 'react';

const StyledCard = styled(MuiCard)`
    background: ${p => p.theme.palette.background.paper};
`;

const StyledContent = styled(CardContent)`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ScrollContent = styled.div`
    overflow: scroll;
`;

export const Card: FC<{ title: string }> = ({
    children,
    title,
}) => {
    return <StyledCard variant="outlined">
        <StyledContent>
            <Typography variant="h6">
                {title}
            </Typography>
            <ScrollContent>
                { children }
            </ScrollContent>
        </StyledContent>
    </StyledCard>;
};
