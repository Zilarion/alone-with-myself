import * as React from 'react';

import { Printer } from '../models';
import styled from '../themed-components';

const PrintWrapper = styled.div`
    display: grid;
    grid-gap: ${p => p.theme.margin.tiny};
`;

const PrinterBlock = styled.div`
    width: 16px;
    height: 16px;
    position: relative;
`;

const InactivePrinter = styled(PrinterBlock)`
    background: ${p => p.theme.color.disabled};
`;

const ActivePrinter = styled(PrinterBlock)`
    background: ${p => p.theme.color.green};
`;

interface PrinterSummaryProps {
    printers: Printer[];
}

export function PrinterSummary({ printers }: PrinterSummaryProps) {
    const printBlocks = printers.map(({ isPrinting }, idx) => {
        if (!isPrinting) {
            return <InactivePrinter key={idx} />;
        }

        return <ActivePrinter key={idx} />;
    });

    return <PrintWrapper>
        { printBlocks }
    </PrintWrapper>;
}
