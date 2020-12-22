import { observer } from 'mobx-react-lite';

import { Printable } from '../internal';
import styled from '../themed-components';
import { ResourceSetSummary } from './ResourceSetSummary';

interface PrintableTooltipProps {
    printable: Printable;
}

const TooltipWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.margin.small};
`;

const TooltipHeader = styled.span`
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid ${p => p.theme.color.disabled};
`;

export const PrintableTooltip = observer(({ 
    printable: {
        name,
        cost,
    },
}: PrintableTooltipProps) => {
    return <TooltipWrapper>
        <TooltipHeader>{name}</TooltipHeader>
        <ResourceSetSummary resources={cost} />
    </TooltipWrapper>
})
