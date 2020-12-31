import {
    assert,
    PrintableSchema,
    PrintableType,
    ResourceType,
} from '../internal';

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
            duration: 20,
        },
    ],
    [
        PrintableType.foundry, {
            name: 'Foundry',
            cost: [
                {
                    type: ResourceType.minerals,
                    amount: 50,
                },
            ],
            duration: 10,
        },
    ],
]);

export function findPrintableSchema(type: PrintableType): PrintableSchema {
    const printable = PRINTABLES.get(type);
    assert(printable != null, `Could not find printable ${type}`);

    return printable;
}

