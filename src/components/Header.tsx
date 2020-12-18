import { FC } from 'react';

import styled from '../themed-components';

const StyledHeader =styled.h2`
    color: ${({ theme }) => theme.color.header};
    margin-top: ${p => p.theme.margin.small};
`;

export const Header: FC = ({ children }) => {
    return <StyledHeader>
        {children}
    </StyledHeader>;
}
