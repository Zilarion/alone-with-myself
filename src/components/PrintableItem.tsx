import { Flex } from '@hope-ui/solid';

import { PrintableInstance } from '../models/PrintableUnion';
import { Printers } from '../models/Printers';
import { Materials } from '../models/types/Materials';
import { Button } from './Button';
import { FormattedMass } from './FormattedMinerals';
import { FormattedPower } from './FormattedPower';

interface PrintableItemProps {
    printable: PrintableInstance;
    printableCount: number;
    storage: Materials;
    spentMass: (amount: number) => void;
    printers: Printers;
}

export const PrintableItem = (props: PrintableItemProps) => {
    const disabled = () => props.printable.maxAffordable(props.storage) < props.printableCount;
    const mass = () => props.printable.cost;
    const power = () => props.printable.powerUsage;

    return <Button
        disabled={disabled()}
        fullWidth
        onClick={() => {
            props.spentMass(
                props.printable.cost * props.printableCount,
            );
            props.printers.addPrintTask({
                printable: props.printable,
                count: props.printableCount,
            });
        }}
    >
        <Flex direction='column' gap='$2'>
            {`${props.printable.id} (${props.printable.amount})`}

            <Flex gap="$2">
                <FormattedMass
                    amount={mass()}
                />
                <FormattedPower
                    amount={power()}
                />
            </Flex>
        </Flex>
    </Button>;
};
