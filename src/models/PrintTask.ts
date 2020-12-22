import { makeAutoObservable } from 'mobx';

import {
    assert,
    multiplyResources,
    Printable,
    resourcesForPrintable,
    ResourceStorage,
} from '../internal';

interface PrintTaskProps {
    printable: Printable;
    storage: ResourceStorage;
}

export class PrintTask {
    private _count: number = 0;
    private _progress: number = 0;
    private _storage: ResourceStorage;
    private _printable: Printable;

    constructor({
        printable,
        storage,
    }: PrintTaskProps) {
        this._storage = storage;
        this._printable = printable;

        makeAutoObservable(this);
    }

    public get printable() {
        return this._printable;
    }

    public get durationPerItem() {
        return this._printable.duration;
    }

    public get maxAffordable() {
        return Math.floor(
            resourcesForPrintable(
                this._storage,
                this._printable,
            ),
        );
    }

    public startPrint = (amount: number) => {
        assert(this.maxAffordable >= amount, 'Attempting to print more than affordable.');
        this._storage.decrement(
            multiplyResources(
                this._printable.cost,
                amount,
            ),
        );
    }

    public get active() {
        return this.count > 0 && this.progress > 0;
    }

    public get name() {
        return this._printable.name;
    }

    public get count() {
        return this._count;
    }

    public set count(newValue: number) {
        this._count = newValue;
    }

    public get progressPercentage() {
        if (this.count === 0) {
            return 0;
        }

        const totalCost = this.durationPerItem * this.count;
        return this._progress / totalCost;
    }

    public get progress() {
        return this._progress;
    }

    public set progress(newValue: number) {
        this._progress = newValue;
    }
}
