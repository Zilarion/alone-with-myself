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

export const Button = (props: ButtonProps) => {
    return <Tooltip
        label={props.tooltip ?? props.children}
    >
        <HopeUiButton
            variant={'outline'}
            onClick={props.onClick}
            color="primary"
            disabled={props.disabled}
            fullWidth={props.fullWidth}
        >
            {props.children}
        </HopeUiButton>
    </Tooltip>;
};
