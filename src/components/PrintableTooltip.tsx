import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { Printable } from '../internal';
import { ResourceSetSummary } from './ResourceSetSummary';

interface PrintableTooltipProps {
    printable: Printable;
}

const TooltipWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.spacing(2)}px;
`;

const TooltipHeader = styled.span`
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid ${p => p.theme.palette.text.disabled};
`;

export const PrintableTooltip = observer(({
    printable: {
        id,
        cost,
    },
}: PrintableTooltipProps) => {
    return <TooltipWrapper>
        <TooltipHeader>
            {id}
        </TooltipHeader>
        <ResourceSetSummary resources={cost} />
    </TooltipWrapper>;
});
