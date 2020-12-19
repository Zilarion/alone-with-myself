import { observer } from 'mobx-react-lite';

import { Printable } from '../models/Printable';
import { PrintTask } from '../models/PrintTask';
import { assert } from '../util';
import { ProgressButton } from './ProgressButton';
import { Table } from './Table';

interface PrintableSummaryProps {
    tasks: PrintTask[];
    printables: Printable[];
}

export const PrintableSummary = observer(({
    tasks,
    printables,
}: PrintableSummaryProps) => {
    const data = tasks.map((task) => {
        const printable = printables.find((printable) => task.printable === printable);
        assert(printable != null, 'Failed to find related printable of a print task.');
        return [
            <ProgressButton
                fullWidth={true}
                key={0}
                onClick={() => {
                    task.count++;
                }}
                progress={task.progressPercentage}
            >
                { task.name } ({ printable.amount })
            </ProgressButton>
        ];
    });

    return <Table
        data={data}
    />;
});
