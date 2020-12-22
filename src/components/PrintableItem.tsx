import { observer } from 'mobx-react-lite';

import {
    Printable,
    PrintTask,
} from '../internal';
import { PrintableTooltip } from './PrintableTooltip';
import { ProgressButton } from './ProgressButton';

interface PrintableItemProps {
    printable: Printable;
    task: PrintTask;
}

export const PrintableItem = observer(({
    printable,
    task,
}: PrintableItemProps) => {
    const disabled = task.maxAffordable === 0;
    return <ProgressButton
        disabled={disabled}
        fullWidth={true}
        key={0}
        onClick={() => {
            task.count++;
        }}
        tooltip={<PrintableTooltip printable={printable} />}
        progress={task.progressPercentage}
    >
        { task.name } ({ printable.amount })
    </ProgressButton>;
});
