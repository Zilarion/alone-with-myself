import styled from '@emotion/styled';

import {
    Button,
    ButtonProps,
} from './Button';

type ProgressButtonProps = {
    progress?: number;
} & ButtonProps;

interface ProgressProps {
    progress: number;
}

const ProgressBackground = styled.div<ProgressProps>`
    width: ${p => p.progress * 100}%;
    transition: width 500ms linear;
    height: 100%;
    position: absolute;
    background: ${p => p.theme.palette.divider};
`;

const ProgressWrapper = styled.div<{ fullWidth: boolean }>`
    display: ${p => p.fullWidth ? 'flex' : 'inline-flex'};
    position: relative;
`;

export const ProgressButton = ({
    children,
    disabled,
    onClick,
    tooltip,
    progress = 0,
    fullWidth = false,
}: ProgressButtonProps) => {
    return <ProgressWrapper fullWidth={fullWidth}>
        <ProgressBackground progress={progress} />
        <Button
            tooltip={tooltip}
            disabled={disabled}
            onClick={onClick}
            fullWidth={fullWidth}
        >
            {children}
        </Button>
    </ProgressWrapper>;
};
