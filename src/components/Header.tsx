import styled from '@emotion/styled';
import { FC } from 'react';

const StyledHeader = styled.h2`
    color: ${({ theme }) => theme.palette.header};
    margin-top: ${p => p.theme.spacing(2)}px;
`;

export const Header: FC = ({ children }) => {
    return <StyledHeader>
        {children}
    </StyledHeader>;
};
