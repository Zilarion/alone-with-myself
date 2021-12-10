import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';
import Tippy from '@tippyjs/react';
import { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<{
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    tooltip?: string | JSX.Element;
    progress?: number;
    fullWidth?: boolean;
}>;

const TippyWrapper = styled.div<{ fullWidth: boolean }>`
    width: ${p => p.fullWidth ? '100%' : 'auto'};
    display: ${p => p.fullWidth ? 'block' : 'inline'};
`;

export const Button = ({
    onClick,
    disabled,
    children,
    tooltip,
    fullWidth = false,
}: ButtonProps) => {
    return <Tippy
        theme="scifi"
        content={tooltip ?? children}>
        <TippyWrapper fullWidth={fullWidth}>
            <MuiButton
                variant="outlined"
                onClick={onClick}
                color="primary"
                size="medium"
                disabled={disabled}
                fullWidth={fullWidth}
            >
                {children}
            </MuiButton>
        </TippyWrapper>
    </Tippy>;
};
