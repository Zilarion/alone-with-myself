import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import {
    assert,
    Printable,
    PrintTask,
} from '../internal';
import { PrintableItem } from './PrintableItem';

interface PrintableSummaryProps {
    tasks: PrintTask[];
    printables: Printable[];
    printableCount: number;
}

const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${p => p.theme.spacing(2)}px;
`;

export const PrintablesList = observer(({
    tasks,
    printables,
    printableCount,
}: PrintableSummaryProps) => {
    return <ListWrapper>
        {
            tasks.map((task) => {
                const taskPrintable = printables.find((printable) => task.printable === printable);
                assert(taskPrintable != null, 'Failed to find related printable of a print task.');
                return <PrintableItem
                    key={taskPrintable.name}
                    printableCount={printableCount}
                    task={task}
                    printable={taskPrintable}
                />;
            })
        }

    </ListWrapper>;
});
