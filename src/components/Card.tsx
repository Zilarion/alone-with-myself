
import {
    animated,
    useSpring,
} from 'react-spring';

import styled from '../themed-components';
import { Header } from './Header';

const StyledCard = styled.div`
    background: ${p => p.theme.color.background};
    border-top: 2px solid ${p => p.theme.color.primary};
    box-shadow: 0 0 1px ${p => p.theme.color.primary};
    padding: ${p => p.theme.margin.medium};
    overflow: hidden;
`;

type CardProps = React.PropsWithChildren<{
    header: string;
}>

export function Card({
    header,
    children,
}: CardProps) {
    const props = useSpring({
        opacity: 1, from: { opacity: 0 },
    });

    return <animated.div style={props}>
        <StyledCard>
            <Header>{ header }</Header>
            { children }
        </StyledCard>
    </animated.div>;
}
