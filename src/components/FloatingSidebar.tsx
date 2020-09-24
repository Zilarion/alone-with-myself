import * as React from 'react';

import styled from '../themed-components';

const StyledSideBar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
`;

export function FloatingSidebar({ children }: React.Props<{}>) {
    return (
        <StyledSideBar>
            { children }
        </StyledSideBar>
    );
}
