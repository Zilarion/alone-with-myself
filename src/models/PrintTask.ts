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

    get printable() {
        return this._printable;
    }

    get durationPerItem() {
        return this._printable.duration;
    }

    get maxAffordable() {
        return Math.floor(
            resourcesForPrintable(
                this._storage,
                this._printable,
            ),
        );
    }

    startPrint = (amount: number) => {
        assert(this.maxAffordable >= amount, 'Attempting to print more than affordable.');
        this._storage.decrement(
            multiplyResources(
                this._printable.cost,
                amount,
            ),
        );
    };

    get active() {
        return this.count > 0 && this.progress > 0;
    }

    get name() {
        return this._printable.name;
    }

    get count() {
        return this._count;
    }

    set count(newValue: number) {
        this._count = newValue;
    }

    get progressPercentage() {
        if (this.count === 0) {
            return 0;
        }

        return this._progress / this.durationPerItem;
    }

    get progress() {
        return this._progress;
    }

    set progress(newValue: number) {
        this._progress = newValue;
    }
}
