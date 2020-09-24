import * as React from 'react';

import styled from '../themed-components';

const StyledHeader =styled.h2`
    color: ${({ theme }) => theme.color.header};
    margin-top: ${p => p.theme.margin.small};
`;

export function Header({ children }: React.Props<{}>) {
    return <StyledHeader>
        {children}
    </StyledHeader>;
}
