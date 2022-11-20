import { PrintableSnapshot } from '../models/PrintableUnion';
import { PrinterSnapshot } from '../models/Printer';
import { PrintableType } from '../models/types/PrintableType';
import { ResourceType } from '../models/types/ResourceType';
import { harvesterSnapshots } from './Harvesters';
import { manufacturerSnapshots } from './Manufacturers';

export const printerSnapshot: PrinterSnapshot = {
    type: PrintableType.printer,
    id: 'Printer',
    cost: [
        {
            type: ResourceType.minerals,
            amount: 1000,
        },
    ],
    duration: 20,
    amount: 1,
};

export const PRINTABLES: PrintableSnapshot[] = [
    ...harvesterSnapshots,
    ...manufacturerSnapshots,
    printerSnapshot,
];
