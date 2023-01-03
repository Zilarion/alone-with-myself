import { createStore } from 'solid-js/store';

import { assert } from '../util/assert';
import { IPrintable } from './IPrintable';
import { Materials } from './types/Materials';
import { PrintableType } from './types/PrintableType';

export interface PrinterSnapshot extends IPrintable {
    type: PrintableType.printer;
}

export interface Printer extends ReturnType<typeof createPrinter> {}

export function createPrinter({
    type,
    cost,
    id,
    duration,
    powerUsage,
    amount = 0,
}: PrinterSnapshot) {
    const [ store, setStore ] = createStore({
        type,
        cost,
        id,
        duration,
        powerUsage,
        amount,
        get capacityPerSecond() {
            return this.amount;
        },
        maxAffordable(materials: Materials) {
            return Math.floor(
                materials.mass / this.cost,
            );
        },
        add(increment: number) {
            assert(this.amount + increment >= 0, 'An attempt was made to decrease a printable below zero.');
            setStore('amount', this.amount + increment);
        },
    });

    return store;
}
