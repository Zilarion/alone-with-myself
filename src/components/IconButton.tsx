import {
    // eslint-disable-next-line no-restricted-imports
    IconButton as MaterialUiButton,
    IconButtonProps as MaterialUiIconButtonProps,
    Tooltip,
} from '@mui/material';
import { forwardRef } from 'react';

import { Linkable } from './Linkable';

interface IconButtonProps extends MaterialUiIconButtonProps, Linkable {
    label: string;
}

const IconButtonComponent = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
    const {
        label,
        ...buttonProps
    } = props;

    const button = <MaterialUiButton
        {...buttonProps}
        ref={ref}
        aria-label={label}
    />;

    return <Tooltip
        title={label}
    >
        {button}
    </Tooltip>;
});

IconButtonComponent.displayName = 'IconButton';
export const IconButton = IconButtonComponent;
