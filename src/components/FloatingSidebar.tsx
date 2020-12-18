

import styled from '../themed-components';

const StyledSideBar = styled.div`
    position: absolute;
    top: ${p => p.theme.margin.medium};
    color: ${p => p.theme.color.primary};
    width: 300px;
`;

type FloatingSidebarProps = React.PropsWithChildren<{
    side: 'left' | 'right';
}>


export function FloatingSidebar({
    children,
    side,
}: FloatingSidebarProps) {
    const style = side === 'left' ? { left: 16 } : { right: 16 };
    return (
        <StyledSideBar style={style}>
            { children }
        </StyledSideBar>
    );
}
