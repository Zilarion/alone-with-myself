import { Flex } from '@hope-ui/solid';
import { For } from 'solid-js';

import { PrintableInstance } from '../models/PrintableUnion';
import { Printers } from '../models/Printers';
import { Materials } from '../models/types/Materials';
import { PrintableItem } from './PrintableItem';

interface PrintableSummaryProps {
    printables: PrintableInstance[];
    printableCount: number;
    storage: Materials;
    printers: Printers;
    spentMass: (amount: number) => void;
}

export const PrintablesList = (props: PrintableSummaryProps) => {
    return <Flex
        flexDirection='column'
        gap='$2'
    >
        <For each={props.printables}>
            {printable => <PrintableItem
                printableCount={props.printableCount}
                spentMass={props.spentMass}
                printable={printable}
                storage={props.storage}
                printers={props.printers}
            />}
        </For>
    </Flex>;
};
