import {
    Button as HopeUiButton,
    Tooltip,
} from '@hope-ui/solid';
import { JSX } from 'solid-js';

type ButtonProps = {
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    tooltip?: JSX.Element;
    progress?: number;
    fullWidth?: boolean;
    children?: JSX.Element;
};

export const Button = ({
    onClick,
    disabled,
    children,
    tooltip,
    fullWidth = false,
}: ButtonProps) => {
    return <Tooltip
        label={tooltip ?? children}
    >
        <HopeUiButton
            variant={'outline'}
            onClick={onClick}
            color="primary"
            disabled={disabled}
            fullWidth={fullWidth}
        >
            {children}
        </HopeUiButton>
    </Tooltip>;
};
