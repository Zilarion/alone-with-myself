
import Tippy from '@tippyjs/react';

import * as React from 'react';

import styled from '../themed-components';

const StyledButton = styled.button`
    border: 1px solid ${p => p.theme.color.primary};
    color: ${p => p.theme.color.primary};
    background: none;
    transition: all 0.8s;
    outline: none;

    &:hover {
        border-color: 1px solid ${p => p.theme.color.primaryLight};
        color: ${p => p.theme.color.primaryLight};
        cursor: pointer;
    }

    &:active {
        box-shadow: 0 0 5px ${p => p.theme.color.primaryLight};
        transition-duration: 0.05s;
    }
`;

const DisabledButton = styled.button`
    border: 1px solid ${p => p.theme.color.disabled};
    color: ${p => p.theme.color.disabled};
    cursor: auto;
    background: none;
    transition: all 0.8s;
    outline: none;
`;

type ButtonProps = React.PropsWithChildren<{
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
    const Btn = disabled ? DisabledButton : StyledButton;

    return <Tippy content={tooltip}>
        <Btn onClick={onClick}>
            {children}
        </Btn>
    </Tippy>;
}
