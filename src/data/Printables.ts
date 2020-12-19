import { PrintableSchema } from '../models/Printable';
import { PrintableType } from '../models/PrintableType';
import { ResourceType } from '../models/ResourceType';
import { assert } from '../util';

export const PRINTABLES = new Map<PrintableType, PrintableSchema>([
    [
        PrintableType.miner, {
            name: 'Miner',
            cost: [
                {
                    type: ResourceType.minerals,
                    amount: 10,
                },
            ],
            duration: 5,
        },
    ],
    [
        PrintableType.printer, {
            name: 'Printer',
            cost: [
                {
                    type: ResourceType.minerals,
                    amount: 100,
                },
            ],
            duration: 60,
        },
    ],
]);

export function findPrintableSchema(type: PrintableType): PrintableSchema {
    const printable = PRINTABLES.get(type);
    assert(printable != null, `Could not find printable ${type}`);

    return printable;
}

