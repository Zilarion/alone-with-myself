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

    public takeTask() {
        return this._queue.shift();
    }
    public get hasTask() {
        return this.queueLength > 0;
    }
}
