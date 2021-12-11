import {
    manufacturerSnapshots,
    PrintableSnapshot,
    PrintableType,
    PrintersSnapshot,
    ResourceType,
} from '../internal';
import { harvesterSnapshots } from './Harvesters';

export const printerSnapshot: PrintersSnapshot = {
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
