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
    private _queue: PrintTask[] = [];
    private _task: PrintTask | null = null;
    private _progress: number = 0;

    public get isPrinting() {
        return this._task != null;
    }

    public enqueue(task: PrintTask) {
        this._queue.push(task);
    }

    public update(delta: number) {
        if (this._queue.length > 0) {
            this._task = this._popTask();
        } else {
            this._task = null;
            this._progress = 0;
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
