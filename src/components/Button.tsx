import { Button as MuiButton } from '@material-ui/core';
import Tippy from '@tippyjs/react';

import { PropsWithChildren } from 'react';

import styled from '../themed-components';

export type ButtonProps = PropsWithChildren<{
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    tooltip?: string | JSX.Element;
    progress?: number;
    fullWidth?: boolean;
}>;

const TippyWrapper = styled.div<{ fullWidth: boolean }>`
    width: ${p => p.fullWidth ? '100%' : 'auto'};
`;

export function Button({
    onClick,
    disabled,
    children,
    tooltip,
    fullWidth = false,
}: ButtonProps) {
    return <Tippy theme="scifi" content={tooltip ?? children}>
        <TippyWrapper fullWidth={fullWidth}>
            <MuiButton
                variant="outlined"
                onClick={onClick}
                color="primary"
                size="small"
                disabled={disabled}
                fullWidth={fullWidth}
            >
                {children}
            </MuiButton>
        </TippyWrapper>
    </Tippy>;
}
