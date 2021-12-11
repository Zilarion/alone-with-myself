import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import {
    multiplyResources,
    Printable,
    Printers,
    ResourceStorage,
} from '../internal';
import { PrintableTooltip } from './PrintableTooltip';
import { ProgressButton } from './ProgressButton';

interface PrintableItemProps {
    printable: Printable;
    printableCount: number;
    storage: ResourceStorage;
    printers: Printers;
}

export const PrintableItem = observer(({
    printable,
    printableCount,
    printers,
    storage,
}: PrintableItemProps) => {
    const disabled = printable.maxAffordable(storage) < printableCount;

    return <ProgressButton
        disabled={disabled}
        fullWidth
        onClick={action(() => {
            storage.decrement(
                multiplyResources(
                    printable.cost,
                    printableCount,
                ),
            );

            printers.addPrintTask({
                printable: printable.id,
                count: printableCount,
            });
        })}
        tooltip={<PrintableTooltip printable={printable} />}
    >
        {`${printable.id} (${printable.amount})`}
    </ProgressButton>;
});
