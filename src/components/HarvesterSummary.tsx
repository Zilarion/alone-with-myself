import * as React from 'react';
import { FormattedNumber } from 'react-intl';

import { findPrintable } from '../models/Printable';
import { PrintableType } from '../models/PrintableType';
import { Table } from './Table';

interface HarvesterSummaryProps {
    harvesters: {
        type: PrintableType;
        amount: number;
    }[];
}
export const HarvesterSummary = ({ harvesters }: HarvesterSummaryProps) => {
    const data = harvesters.map(({
        type, amount,
    }, idx) => [
        findPrintable(type).name,
        <FormattedNumber
            key={idx}
            value={amount}
            maximumFractionDigits={0}
        />,
    ]);
    return <Table
        headers={[ 'Type', 'Amount' ]}
        data={data}
    />;
};
