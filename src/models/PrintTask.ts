import { createStore } from 'solid-js/store';

import { PrintableInstance } from './PrintableUnion';

export interface PrintTaskSnapshot {
    count?: number;
    progress?: number;
    printable: PrintableInstance;
}

export interface PrintTask extends ReturnType<typeof createPrintTask> {}

export function createPrintTask({
    count = 0,
    progress = 0,
    printable,
}: PrintTaskSnapshot) {
    const [ store, setStore ] = createStore({
        count,
        progress,
        printable,
        get durationPerItem() {
            return this.printable.duration;
        },
        get active() {
            return this.count > 0 && this.progress > 0;
        },
        get id() {
            return this.printable.id;
        },
        get progressPercentage() {
            if (this.count === 0) {
                return 0;
            }

            return this.progress / this.durationPerItem;
        },
        setCount(newValue: number) {
            setStore('count', newValue);
        },
        setProgress(newValue: number) {
            setStore('progress', newValue);
        },
    });

    return store;
}
