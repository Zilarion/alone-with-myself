import {
    Instance,
    types,
} from 'mobx-state-tree';

import {
    printCapacity,
    PrinterModel,
    PrintTaskModel,
    PrintTaskSnapshot,
} from '../internal';

export const PrintersModel = types
    .model('Printers', {
        printers: types.reference(PrinterModel),
        tasks: types.array(PrintTaskModel),
    })
    .views(self => ({
        get capacityPerMs() {
            return self.printers.capacityPerMs;
        },
    }))
    .actions(self => ({
        addPrintTask(task: PrintTaskSnapshot) {
            self.tasks.push(task);
        },
        update(delta: number) {
            const capacity = self.capacityPerMs * delta;
            let remainingCapacity = capacity;

            self.tasks.forEach((task) => {
                const {
                    capacityLeft,
                    numberFinished,
                    progress,
                } = printCapacity(remainingCapacity, task);

                remainingCapacity = capacityLeft;
                task.printable.add(numberFinished);
                task.progress = progress;
                task.count -= numberFinished;

                if (task.count === 0) {
                    task.progress = 0;
                    self.tasks.remove(task);
                }
            });
        },
    }));

export interface Printers extends Instance<typeof PrintersModel> {}
