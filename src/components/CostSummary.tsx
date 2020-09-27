import * as React from 'react';

import { ResourceSet } from '../models';
import { Table } from './Table';

interface CostSummaryProps {
    cost: ResourceSet;
}

export function CostSummary ({ cost }: CostSummaryProps) {
    const data = cost.map(({
        type, amount,
    }) => [ type.toString(), amount.toString() ]);

    return <Table data={data}></Table>;
}
