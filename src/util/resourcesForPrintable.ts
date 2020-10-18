import { ResourceStorage } from '../models';
import { Printable } from '../models/Printable';

export function resourcesForPrintable({ numberOf }: ResourceStorage, { cost }: Printable) {
    return cost.reduce((minimum, {
        type, amount,
    }) => {
        const numberOnlyThisResource = numberOf(type) / amount;
        return Math.min(minimum, numberOnlyThisResource);
    }, Infinity);
}
