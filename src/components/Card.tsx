import * as React from 'react';

import styled from '../themed-components';
import { Header } from './Header';

const StyledCard = styled.div`
    background: ${p => p.theme.color.background};
    border-top: 2px solid ${p => p.theme.color.primary};
    box-shadow: 0 0 1px ${p => p.theme.color.primary};
    padding: ${p => p.theme.margin.medium};
`;

type CardProps = React.PropsWithChildren<{
    header: string;
}>

export function Card({
    header, children,
}: CardProps) {
    return <StyledCard>
        <Header>{ header }</Header>
        { children }
    </StyledCard>;
}
