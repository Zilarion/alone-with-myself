import { useFormatting } from '../hooks/useFormatting';
import { ResourceSet } from '../models/types/ResourceSet';
import { FormattedResource } from './FormattedResource';
import { Table } from './Table';

interface ResourceSetSummaryProps {
    resources: ResourceSet;
    delta?: ResourceSet;
    showHeader?: boolean;
    compact?: boolean;
}

export const ResourceSetSummary = ({
    resources,
    delta,
    compact = false,
    showHeader = false,
}: ResourceSetSummaryProps) => {
    const { formatNumber } = useFormatting();

    const data = resources.map(({
        type: resource, amount,
    }, idx) => [
        resource,
        <FormattedResource
            value={amount}
            type={resource}
            compact={compact}
        />,
        ... (delta ? [
            formatNumber(delta[idx].amount, {
                notation: 'compact',
                signDisplay: 'always',
            }),
        ] : []),
    ]);

    return <Table
        headers={showHeader ? [ 'Resource', 'Amount', 'Production' ] : []}
        data={data}
    />;
};
