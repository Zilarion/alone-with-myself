import { observer } from 'mobx-react-lite';
import { FormattedNumber } from 'react-intl';

import { ResourceStorage } from '../models';
import { ResourceSet } from '../models/types';
import { FormattedResource } from './FormattedResource';
import { Table } from './Table';

interface StorageSummaryProps {
    storage: ResourceStorage;
    delta?: ResourceSet;
    showHeader?: boolean;
    compact?: boolean;
}

export const StorageSummary = observer(({
    storage,
    delta,
    compact = false,
    showHeader = false,
}: StorageSummaryProps) => {
    const data = storage.resources.map((resource, idx) => [
        resource,
        <FormattedResource
            key={resource}
            value={storage.numberOf(resource)}
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
