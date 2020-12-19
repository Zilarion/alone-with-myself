import { Button as MuiButton } from '@material-ui/core';
import Tippy from '@tippyjs/react';

import { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<{
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    tooltip?: string | JSX.Element;
    progress?: number;
    fullWidth?: boolean;
}>;

export function Button({
    onClick,
    disabled,
    children,
    tooltip,
    fullWidth = false,
}: ButtonProps) {
    return <Tippy content={tooltip ?? children}>
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
    </Tippy>;
}
