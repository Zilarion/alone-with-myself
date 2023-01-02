import { Flex } from '@hope-ui/solid';

import { PrintableInstance } from '../models/PrintableUnion';
import { Printers } from '../models/Printers';
import { ResourceStorage } from '../models/ResourceStorage';
import { ResourceType } from '../models/types/ResourceType';
import { multiplyResources } from '../util/multiplyResources';
import { Button } from './Button';
import { FormattedMinerals } from './FormattedMinerals';
import { FormattedPower } from './FormattedPower';

interface PrintableItemProps {
    printable: PrintableInstance;
    printableCount: number;
    storage: ResourceStorage;
    printers: Printers;
}

export const PrintableItem = (props: PrintableItemProps) => {
    const disabled = () => props.printable.maxAffordable(props.storage) < props.printableCount;
    const minerals = () => props.printable.cost.find((resource) => resource.type === ResourceType.minerals)?.amount ?? 0;
    const power = () => props.printable.cost.find((resource) => resource.type === ResourceType.power)?.amount ?? 0;

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
    >
        <Flex direction='column' gap='$2'>
            {`${props.printable.id} (${props.printable.amount})`}

            <Flex gap="$2">
                <FormattedMinerals
                    amount={minerals()}
                />
                <FormattedPower
                    amount={power()}
                />
            </Flex>
        </Flex>
    </Button>;
};
