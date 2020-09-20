import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    Entity,
    EntityType,
} from './Entity';

interface PrintTask {
    complete: Function;
    duration: number;
}

export class Printer extends Entity {
    protected _type = EntityType.Printer;

    @observable
    private _queue: PrintTask[] = [];

    @observable
    private _task: PrintTask | null = null;

    @observable
    private _progress: number = 0;

    public get isPrinting() {
        return this._task != null;
    }

    @action.bound
    public enqueue(task: PrintTask) {
        this._queue.push(task);
    }

    @computed
    public get queueLength(): number {
        return this._queue.length + (this._task == null ? 0 : 1);
    }

    @computed
    public get taskProgress() {
        if (this._task == null) {
            return 0;
        }

        return this._progress / this._task.duration;
    }

    public update(delta: number) {
        if (this._task == null && this._queue.length === 0) {
            this._progress = 0;
        }

        if (this._task == null && this._queue.length > 0) {
            this._task = this._popTask();
        }

        if (this._task == null) {
            return;
        }

        const {
            duration,
            complete,
        } = this._task;

        this._progress += delta;

        if (duration <= this._progress) {
            complete();
            this._progress -= duration;
            this._task = null;
        }
    }

    public pointIsInside() {
        return false;
    }

    private _popTask(): PrintTask {
        const task = this._queue.shift();
        if (task == null) {
            throw Error('Printer tried to take non existing task.');
        }
        return task;
    }
}
