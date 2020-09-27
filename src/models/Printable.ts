import { PRINTABLES } from '../data';
import { assert } from '../util';
import { PrintableType } from './PrintableType';
import { ResourceSet } from './ResourceSet';

export interface Printable {
    cost: ResourceSet;
    duration: number;
    name: string;
}

export function findPrintable(type: PrintableType): Printable {
    const printable = PRINTABLES.get(type);
    assert(printable != null, `Could not find printable ${type}`);

    return printable;
}
