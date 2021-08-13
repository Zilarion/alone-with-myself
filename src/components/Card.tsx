import styled from '@emotion/styled';
import {
    animated,
    useSpring,
} from 'react-spring';

import { Header } from './Header';

const StyledCard = styled.div`
    background: ${p => p.theme.palette.background.default};
    border-top: 2px solid ${p => p.theme.palette.primary.main};
    box-shadow: 0 0 1px ${p => p.theme.palette.primary.main};
    padding: ${p => p.theme.spacing(2)}px;
    overflow: hidden;
`;

type CardProps = React.PropsWithChildren<{
    header: string;
}>;

export const Card = ({
    header,
    children,
}: CardProps) => {
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    return <animated.div style={props}>
        <StyledCard>
            <Header>
                { header }
            </Header>
            { children }
        </StyledCard>
    </animated.div>;
};
