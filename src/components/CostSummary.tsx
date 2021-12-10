import { ResourceSet } from '../internal';
import { Table } from './Table';

interface CostSummaryProps {
    cost: ResourceSet;
}

export const CostSummary = ({ cost }: CostSummaryProps) => {
    const data = cost.map(({
        type, amount,
    }) => [ type.toString(), amount.toString() ]);

    return <Table data={data} />;
};
