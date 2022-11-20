import { action } from 'mobx';

import { Printable } from '../models/PrintableUnion';
import { Printers } from '../models/Printers';
import { ResourceStorage } from '../models/ResourceStorage';
import { multiplyResources } from '../util/multiplyResources';
import { Button } from './Button';
import { PrintableTooltip } from './PrintableTooltip';

interface PrintableItemProps {
    printable: Printable;
    printableCount: number;
    storage: ResourceStorage;
    printers: Printers;
}

export const PrintableItem = ({
    printable,
    printableCount,
    printers,
    storage,
}: PrintableItemProps) => {
    const disabled = printable.maxAffordable(storage) < printableCount;

    return <Button
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
    </Button>;
};
