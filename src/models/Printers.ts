import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import { Printable } from './Printable';
import { PrintTask } from './PrintTask';
import { PrintableType } from './types';

export class Printers extends Printable {
    @observable
    private _tasks = new Set<PrintTask>();

    constructor() {
        super({ type: PrintableType.printer });
        makeObservable(this);
    }

    @computed
    public get capacityPerSecond() {
        return this.amount;
    }

    @action.bound
    public addPrintOption(task: PrintTask) {
        this._tasks.add(task);
    }

    @computed
    public get tasks() {
        return Array.from(this._tasks.values());
    }

    @action.bound
    public update(delta: number) {
        const capacity = this.capacityPerSecond * delta / 1000;
        let remainingCapacity = capacity;

        this.tasks.forEach((task) => {
            const {
                count,
                progress = 0,
                durationPerItem,
                printable,
                startPrint,
                maxAffordable,
            } = task;

            if (maxAffordable === 0 || count === 0) {
                return;
            }

            const progressWasZero = progress === 0;
            const progressPlusCapacity = remainingCapacity + progress;
            const maxPrinted = Math.floor(progressPlusCapacity / durationPerItem);
            const numberPrinted = Math.min(maxPrinted, maxAffordable);
            const completedAll = count === numberPrinted;

            const beforePrintCount = progressWasZero ? numberPrinted + 1 : numberPrinted;
            if (beforePrintCount > 0) {
                startPrint(progressWasZero ? numberPrinted + 1 : numberPrinted);
            }

            if (numberPrinted > 0) {
                task.count -= numberPrinted;
                printable.add(numberPrinted);
            }

            const capacityUsed = numberPrinted * durationPerItem;
            const progressLeft = remainingCapacity - capacityUsed;
            if (!completedAll) {
                task.progress += progressLeft;
                remainingCapacity = 0;
            } else {
                remainingCapacity = progressLeft;
            }
        });
    }
}
