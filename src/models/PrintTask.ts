import { makeAutoObservable } from 'mobx';

import { resourcesForPrintable } from '../util';
import { multiplyResources } from '../util/multiplyResources';
import { Printable } from './Printable';
import { ResourceStorage } from './ResourceStorage';

interface PrintTaskProps {
    printable: Printable;
    storage: ResourceStorage;
    complete: (amount: number) => void;
}

export class PrintTask {
    private _percentageOfTotal: number = 0;
    private _complete: (amount: number) => void;
    private _progress: number = 0;
    private _storage: ResourceStorage;
    private _printable: Printable;

    constructor({
        printable,
        storage,
        complete,
    }: PrintTaskProps) {
        this._storage = storage;
        this._printable = printable;
        this._complete = complete;
        makeAutoObservable(this);
    }

    public get durationPerItem() {
        return this._printable.duration;
    }

    public get maxPrintAmount() {
        return Math.floor(
            resourcesForPrintable(
                this._storage,
                this._printable,
            ),
        );
    }

    public beforePrint = (amount: number) => {
        this._storage.decrement(
            multiplyResources(
                this._printable.cost,
                amount,
            ),
        );
    }

    public get active() {
        return this.percentageOfTotal > 0 && this.progress > 0;
    }

    public get name() {
        return this._printable.name;
    }

    public get complete() {
        return this._complete;
    }

    public get progress() {
        return this._progress;
    }

    public get percentageOfTotal() {
        return this._percentageOfTotal;
    }

    public set percentageOfTotal(newValue: number) {
        this._percentageOfTotal = newValue;
    }

    public set progress(newValue: number) {
        this._progress = newValue;
    }
}
