import styled from '@emotion/styled';
import { CardContent } from '@material-ui/core';
import { FC } from 'react';
import {
    animated,
    useSpring,
} from 'react-spring';

const StyledCard = styled.div`
    background: ${p => p.theme.palette.background.default};
    box-shadow: 0 0 1px ${p => p.theme.palette.primary.main};
    padding: ${p => p.theme.spacing(2)}px;
`;

export const Card: FC = ({ children }) => {
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    return <animated.div style={props}>
        <StyledCard>
            <CardContent>
                { children }
            </CardContent>
        </StyledCard>
    </animated.div>;
};
