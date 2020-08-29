import * as React from 'react';

import styled from '../themed-components';

const StyledHeader =styled.h1`
    color: ${({ theme }) => theme.color.header}
`;

export function Header({ children }: React.Props<{}>) {
    return <StyledHeader>
        {children}
    </StyledHeader>;
}
