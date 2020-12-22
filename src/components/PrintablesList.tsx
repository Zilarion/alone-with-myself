import { observer } from 'mobx-react-lite';

import {
    assert,
    Printable,
    PrintTask,
} from '../internal';
import styled from '../themed-components';
import { PrintableItem } from './PrintableItem';

interface PrintableSummaryProps {
    tasks: PrintTask[];
    printables: Printable[];
}

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.margin.small};
`;

export const PrintablesList = observer(({
    tasks,
    printables,
}: PrintableSummaryProps) => {
    return <ListWrapper>
        {
            tasks.map((task) => {
                const printable = printables.find((printable) => task.printable === printable);
                assert(printable != null, 'Failed to find related printable of a print task.');
                return <PrintableItem 
                    key={printable.name} 
                    task={task} 
                    printable={printable} 
                />;
            })
        }

    </ListWrapper>;
});
