import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    Entity,
    EntityType,
} from './Entity';
import { PrintableType } from './PrintableType';
import { PrintTask } from './PrintTask';

export class Printers extends Entity {
    protected _type = EntityType.Printer;

    @observable
    private _tasks = new Map<PrintableType, PrintTask>();

    @observable
    private _amount: number;

    constructor() {
        super();
        this._amount = 0;
    }

    @computed
    public get amount() {
        return this._amount;
    }

    @computed
    public get capacityPerSecond() {
        return this._amount;
    }

    @action.bound
    public addPrintOption(type: PrintableType, task: PrintTask) {
        this._tasks.set(type, task);
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
            } = task;

            if (percentageOfTotal === 0) {
                return;
            }

            const progressIncrease = capacity * percentageOfTotal;
            const newProgress = progress + progressIncrease;

            const numberCompleted = Math.floor(newProgress / durationPerItem);

            if (numberCompleted > 0) {
                complete(numberCompleted);
            }

            const progressLeft = newProgress - numberCompleted * durationPerItem;
            task.progress = progressLeft;
        });
    }
}
