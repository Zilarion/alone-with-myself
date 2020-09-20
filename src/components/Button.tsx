import * as React from 'react';

type ButtonProps = React.PropsWithChildren<{
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
}>;

export function Button({
    onClick,
    disabled,
    children,
}: ButtonProps) {
    return <button
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>;
}
