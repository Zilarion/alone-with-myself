import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { ResourceStorage } from '../models';
import { FormattedResource } from './FormattedResource';
import { Table } from './Table';

interface StorageSummaryProps {
    storage: ResourceStorage;
    showHeader?: boolean;
}

export const StorageSummary = observer(({
    storage,
    showHeader = false,
}: StorageSummaryProps) => {
    const data = storage.resources.map((resource) => [
        resource,
        <FormattedResource
            key={resource}
            value={storage.numberOf(resource)}
            type={resource}
        />,
    ]);

    return <Table
        headers={showHeader ? [ 'Resource', 'Amount' ] : []}
        data={data}
    />;
});
