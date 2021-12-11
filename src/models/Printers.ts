import {
    Instance,
    SnapshotIn,
    types,
} from 'mobx-state-tree';

import {
    PrintableType,
    printCapacity,
    PrintTask,
    PrintTaskModel,
} from '../internal';
import { PrintableModel } from './Printable';

export const PrintersModel = types
    .compose(
        PrintableModel,
        types.model({
            type: types.literal(PrintableType.printer),
            tasks: types.array(PrintTaskModel),
        })
    )
    .named('Printers')
    .views(self => ({
        get capacityPerMs() {
            return self.amount / 1000;
        },
    }))
    .actions(self => ({
        addPrintOption(task: PrintTask) {
            self.tasks.push(task);
        },
        update(delta: number) {
            const capacity = self.capacityPerMs * delta;
            let remainingCapacity = capacity;

            self.tasks.forEach((task) => {
                const {
                    capacityLeft,
                    numberFinished,
                    numberStarted,
                    progress,
                } = printCapacity(remainingCapacity, task);

                remainingCapacity = capacityLeft;
                task.startPrint(numberStarted);
                task.printable.add(numberFinished);
                task.progress = progress;
                task.count -= numberFinished;

                if (task.count === 0) {
                    task.progress = 0;
                }
            });
        },
    }));

export interface Printers extends Instance<typeof PrintersModel> {}
export interface PrintersSnapshot extends SnapshotIn<typeof PrintersModel> {}
