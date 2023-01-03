import { createStore } from 'solid-js/store';

import { printCapacity } from '../util/printCapacity';
import { Printer } from './Printer';
import {
    createPrintTask,
    PrintTaskSnapshot,
} from './PrintTask';

interface PrintersSnapshot {
    printers: Printer;
    tasks: PrintTaskSnapshot[];
}

export type Printers = ReturnType<typeof createPrinters>;

export function createPrinters({
    printers,
    tasks,
}: PrintersSnapshot) {
    const [ store, setStore ] = createStore({
        printers,
        tasks: tasks.map(createPrintTask),
        get capacityPerSecond() {
            return this.printers.capacityPerSecond;
        },

        addPrintTask(task: PrintTaskSnapshot) {
            setStore('tasks', [ ...store.tasks, createPrintTask(task) ]);
        },
        update(
            delta: number,
            power: number
        ) {
            const consumedPower = store.printers.amount * store.printers.powerUsage * delta;
            const isWorking = store.tasks.length > 0;
            if (consumedPower > power || !isWorking) {
                return { consumedPower: 0 };
            }

            const capacity = store.capacityPerSecond * delta;
            let remainingCapacity = capacity;

            store.tasks.forEach((task) => {
                const {
                    capacityLeft,
                    numberFinished,
                    progress,
                } = printCapacity(remainingCapacity, task);

                remainingCapacity = capacityLeft;
                task.printable.add(numberFinished);
                task.setProgress(progress);
                task.setCount(task.count - numberFinished);

                if (task.count === 0) {
                    setStore('tasks', store.tasks.filter(t => t !== task));
                }
            });

            return { consumedPower };
        },
    });

    return store;
}
