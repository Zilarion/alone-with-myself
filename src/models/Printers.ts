import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    Entity,
    EntityType,
} from './Entity';
import { PrintTask } from './PrintTask';

export class Printers extends Entity {
    protected _type = EntityType.Printer;

    @observable
    private _tasks = new Set<PrintTask>();

    @observable
    private _amount: number = 0;

    @computed
    public get amount() {
        return this._amount;
    }

    @computed
    public get capacityPerSecond() {
        return this._amount;
    }

    @action.bound
    public addPrintOption(task: PrintTask) {
        this._tasks.add(task);
    }

    @action.bound
    public addPrinters(increment: number) {
        this._amount += increment;
    }

    @computed
    public get tasks() {
        return Array.from(this._tasks.values());
    }

    @action.bound
    public update(delta: number) {
        const capacity = this.capacityPerSecond * delta / 1000;

        this.tasks.forEach((task) => {
            const {
                percentageOfTotal,
                progress = 0,
                durationPerItem,
                complete,
                beforePrint,
                maxPrintAmount,
            } = task;

            if (maxPrintAmount === 0) {
                return;
            }

            if (percentageOfTotal === 0) {
                return;
            }

            const progressIncrease = capacity * percentageOfTotal;
            const newProgress = progress + progressIncrease;
            const progressWasZero = progress === 0;

            const numberCanBePrinted = Math.floor(newProgress / durationPerItem);
            const numberCompleted = Math.min(numberCanBePrinted, maxPrintAmount);

            const beforePrintCount = progressWasZero ? numberCompleted + 1 : numberCompleted;
            if (beforePrintCount > 0) {
                beforePrint(progressWasZero ? numberCompleted + 1 : numberCompleted);
            }

            if (numberCompleted > 0) {
                complete(numberCompleted);
            }

            const progressLeft = newProgress - numberCompleted * durationPerItem;
            task.progress = progressLeft;
        });
    }
}
