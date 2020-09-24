import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { PrintQueue } from '../models/PrintQueue';
import { Table } from './Table';

interface QueueSummaryProps {
    queue: PrintQueue;
}

export const QueueSummary = observer(({ queue }: QueueSummaryProps) => {
    const data = queue.tasks.map(({
        duration,
        name,
    }) => ([ name, duration.toString() ]));

    return <Table
        headers={[ 'name', 'duration' ]}
        data={data}
    />;
});
