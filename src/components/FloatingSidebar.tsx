import styled from '@emotion/styled';

const StyledSideBar = styled.div`
    position: absolute;
    top: ${p => p.theme.spacing(2)}px;
    color: ${p => p.theme.palette.primary.main};
    width: 500px;
`;

type FloatingSidebarProps = React.PropsWithChildren<{
    side: 'left' | 'right';
}>;

export const FloatingSidebar = ({
    children,
    side,
}: FloatingSidebarProps) => {
    const style = side === 'left' ? { left: 16 } : { right: 16 };
    return (
        <StyledSideBar style={style}>
            { children }
        </StyledSideBar>
    );
};
