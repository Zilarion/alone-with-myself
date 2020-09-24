import * as React from 'react';

import { ResourceStorage } from '../models';
import { Card } from './Card';
import { FormattedResource } from './FormattedResource';
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

    return <Card header="Storage">
        <Table
            headers={[ 'Resource', 'Amount' ]}
            data={data}
        />
    </Card>;
}
