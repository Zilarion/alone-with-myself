import MuiButton from '@material-ui/core/Button';
import Tippy from '@tippyjs/react';

import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    tooltip?: string | JSX.Element;
}>;

export function Button({
    onClick,
    disabled,
    children,
    tooltip,
}: ButtonProps) {
    return <Tippy content={tooltip ?? children}>
        <MuiButton
            variant="outlined"
            onClick={onClick}
            color="primary"
            disabled={disabled}
        >
            {children}
        </MuiButton>
    </Tippy>;
}
