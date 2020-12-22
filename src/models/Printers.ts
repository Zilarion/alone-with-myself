import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    Printable,
    PrintableType,
    printCapacity,
    PrintTask,
} from '../internal';

export class Printers extends Printable {
    @observable
    private _tasks = new Set<PrintTask>();

    constructor() {
        super({ type: PrintableType.printer });
        makeObservable(this);
    }

    @computed
    public get capacityPerMs() {
        return this.amount / 1000;
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
        const capacity = this.capacityPerMs * delta;
        let remainingCapacity = capacity;

        this.tasks.forEach((task) => {
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
    }
}
