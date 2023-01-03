import { PrintableSnapshot } from '../models/PrintableUnion';
import { PrinterSnapshot } from '../models/Printer';
import { PrintableType } from '../models/types/PrintableType';
import { manufacturerSnapshots } from './Manufacturers';

export const printerSnapshot: PrinterSnapshot = {
    type: PrintableType.printer,
    id: 'Printer',
    cost: 30,
    powerUsage: 5,
    duration: 20,
    amount: 1,
};

export const PRINTABLES: PrintableSnapshot[] = [
    ...manufacturerSnapshots,
    printerSnapshot,
];
