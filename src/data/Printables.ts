import {
    manufacturerSnapshots,
    PrintableSnapshot,
    PrintableType,
    PrinterSnapshot,
    ResourceType,
} from 'src/internal';

import { harvesterSnapshots } from './Harvesters';

export const printerSnapshot: PrinterSnapshot = {
    type: PrintableType.printer,
    id: 'Printer',
    cost: [
        {
            type: ResourceType.minerals,
            amount: 100,
        },
    ],
    duration: 20,
};

export const PRINTABLES: PrintableSnapshot[] = [
    ...harvesterSnapshots,
    ...manufacturerSnapshots,
    printerSnapshot,
];
