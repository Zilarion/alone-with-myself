import { observer } from 'mobx-react-lite';
import { FormattedNumber } from 'react-intl';

import { ResourceSet } from '../internal';
import { FormattedResource } from './FormattedResource';
import { Table } from './Table';

interface ResourceSetSummaryProps {
    resources: ResourceSet;
    delta?: ResourceSet;
    showHeader?: boolean;
    compact?: boolean;
}

export const ResourceSetSummary = observer(({
    resources,
    delta,
    compact = false,
    showHeader = false,
}: ResourceSetSummaryProps) => {
    const data = resources.map(({ type: resource, amount }, idx) => [
        resource,
        <FormattedResource
            key={resource}
            value={amount}
            type={resource}
            compact={compact}
        />,
        ... delta ? [
            <FormattedNumber
                key={resource}
                value={delta[idx].amount}
                notation="compact"
                signDisplay="always"
            />,
        ] : [],
    ]);

    return <Table
        headers={showHeader ? [ 'Resource', 'Amount', 'Production' ] : []}
        data={data}
    />;
});
