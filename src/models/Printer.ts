import { createStore } from 'solid-js/store';

import { assert } from '../util/assert';
import { resourcesInStorage } from '../util/resourcesInStorage';
import { IPrintable } from './IPrintable';
import { ResourceStorage } from './ResourceStorage';
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
    amount = 0,
}: PrinterSnapshot) {
    const [ store, setStore ] = createStore({
        type,
        cost,
        id,
        duration,
        amount,
        get capacityPerMs() {
            return this.amount / 1000;
        },

        maxAffordable(storage: ResourceStorage) {
            return Math.floor(
                resourcesInStorage(
                    storage,
                    store.cost,
                ),
            );
        },
        add(increment: number) {
            assert(this.amount + increment >= 0, 'An attempt was made to decrease a printable below zero.');
            setStore('amount', this.amount + increment);
        },
    });

    return store;
}
