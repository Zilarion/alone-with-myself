import { Grid } from '@hope-ui/solid';
import { For } from 'solid-js';

import { PrintableInstance } from '../models/PrintableUnion';
import { Printers } from '../models/Printers';
import { ResourceStorage } from '../models/ResourceStorage';
import { PrintableItem } from './PrintableItem';

interface PrintableSummaryProps {
    printables: PrintableInstance[];
    printableCount: number;
    storage: ResourceStorage;
    printers: Printers;
}

export const PrintablesList = (props: PrintableSummaryProps) => {
    return <Grid
        templateColumns={'1fr 1fr'}
        gap='$2'
        overflow='scroll'
    >
        <For each={props.printables}>
            {printable => <PrintableItem
                printableCount={props.printableCount}
                printable={printable}
                storage={props.storage}
                printers={props.printers}
            />}
        </For>
    </Grid>;
};
