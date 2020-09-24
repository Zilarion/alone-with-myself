import * as React from 'react';

import { ResourceStorage } from '../models';
import { FormattedResource } from './FormattedResource';
import { Header } from './Header';
import { Table } from './Table';

interface StorageSummaryProps {
    storage: ResourceStorage;
}

export function StorageSummary({ storage }: StorageSummaryProps) {
    const data = storage.resources.map((resource) => [
        resource,
        <FormattedResource
            key={resource}
            value={storage.numberOf(resource)}
            type={resource}
        />,
    ]);

    return <div>
        <Header>Storage</Header>
        <Table
            headers={[ 'Resource', 'Amount' ]}
            data={data}
        />
    </div>;
}
