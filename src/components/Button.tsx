import { Button as HopeUiButton } from '@hope-ui/solid';
import { JSX } from 'solid-js';

type ButtonProps = {
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    progress?: number;
    fullWidth?: boolean;
    children?: JSX.Element;
};

export const Button = (props: ButtonProps) => {
    return <HopeUiButton
        variant={'outline'}
        onClick={props.onClick}
        color="primary"
        height="$14"
        disabled={props.disabled}
        fullWidth={props.fullWidth}
    >
        {props.children}
    </HopeUiButton>;
};
