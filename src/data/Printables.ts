
import { Printable } from '../models/Printable';
import { PrintableType } from '../models/PrintableType';
import { ResourceType } from '../models/ResourceType';

export const PRINTABLES = new Map<PrintableType, Printable>([
    [ PrintableType.miner, {
        name: 'Miner',
        cost: [ {
            type: ResourceType.minerals,
            amount: 10,
        } ],
        duration: 1000,
    } ],
    [ PrintableType.printer, {
        name: 'Printer',
        cost: [ {
            type: ResourceType.minerals,
            amount: 100,
        } ],
        duration: 2000,
    } ],
]);
