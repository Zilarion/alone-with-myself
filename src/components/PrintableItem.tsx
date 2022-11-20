import { PrintableInstance } from '../models/PrintableUnion';
import { Printers } from '../models/Printers';
import { ResourceStorage } from '../models/ResourceStorage';
import { multiplyResources } from '../util/multiplyResources';
import { Button } from './Button';
import { PrintableTooltip } from './PrintableTooltip';

interface PrintableItemProps {
    printable: PrintableInstance;
    printableCount: number;
    storage: ResourceStorage;
    printers: Printers;
}

export const PrintableItem = (props: PrintableItemProps) => {
    const disabled = () => props.printable.maxAffordable(props.storage) < props.printableCount;

    return <Button
        disabled={disabled()}
        fullWidth
        onClick={() => {
            props.storage.decrement(
                multiplyResources(
                    props.printable.cost,
                    props.printableCount,
                ),
            );

            props.printers.addPrintTask({
                printable: props.printable,
                count: props.printableCount,
            });
        }}
        tooltip={<PrintableTooltip printable={props.printable} />}
    >
        {`${props.printable.id} (${props.printable.amount})`}
    </Button>;
};
