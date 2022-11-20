import { Grid } from '@hope-ui/solid';
import { For } from 'solid-js';

import { Printable } from '../models/PrintableUnion';
import { Printers } from '../models/Printers';
import { ResourceStorage } from '../models/ResourceStorage';
import { PrintableItem } from './PrintableItem';

interface PrintableSummaryProps {
    printables: Printable[];
    printableCount: number;
    storage: ResourceStorage;
    printers: Printers;
}

export const PrintablesList = ({
    printables,
    printableCount,
    storage,
    printers,
}: PrintableSummaryProps) => {
    return <Grid
        templateColumns={'1fr 1fr'}
        gap='$2'
        overflow='scroll'
    >
        <For each={printables}>
            {printable => <PrintableItem
                printableCount={printableCount}
                printable={printable}
                storage={storage}
                printers={printers}
            />}
        </For>
    </Grid>;
};
