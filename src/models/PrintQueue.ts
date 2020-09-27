import {
    action,
    computed,
    observable,
} from 'mobx';

import { PrintTask } from './PrintTask';

export class PrintQueue {
    @observable
    private _queue: PrintTask[] = [];

    @action.bound
    public enqueue(task: PrintTask) {
        this._queue.push(task);
    }

    @computed
    public get queueLength() {
        return this._queue.length;
    }

    @computed
    public get tasks() {
        return this._queue;
    }

    @action.bound
    public takeTask() {
        return this._queue.shift();
    }

    @computed
    public get hasTask() {
        return this.queueLength > 0;
    }
}
