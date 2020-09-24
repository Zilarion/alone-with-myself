import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    InteractionPoint,
    InteractionPointProps,
} from './InteractionPoint';
import { Printer } from './Printer';
import { PrintQueue } from './PrintQueue';
import { ResourceStorage } from './ResourceStorage';
import { ResourceType } from './ResourceType';

type ResourcePointProps = {
    resources: number;
} & InteractionPointProps;

const MINER_DEFAULT_SPEED = 0.01;

export class ResourcePoint extends InteractionPoint {
    @observable
    private _resources: number;

    @observable
    private _printers: Array<Printer> = new Array();

    @observable
    private _miners: number = 0;

    @observable
    private _operational: boolean = false;

    @observable
    private _storage: ResourceStorage;

    @observable
    private _queue = new PrintQueue();

    constructor(props: ResourcePointProps) {
        super(props);
        this._resources = props.resources;
        this._storage = new ResourceStorage();
    }

    @computed
    public get storage() {
        return this._storage;
    }

    @computed
    public get printers() {
        return this._printers;
    }

    @computed
    public get miners() {
        return this._miners;
    }

    @computed
    public get resources() {
        return this._resources;
    }

    @computed
    public get queue() {
        return this._queue;
    }

    @computed
    public get operational() {
        return this._operational;
    }

    @action.bound
    public activate() {
        this._operational = true;
        this._miners = 1;
        this._printers.push(new Printer(this._queue));
    }

    @action.bound
    public printMiner() {
        const cost = 10;
        if (this._storage.has(ResourceType.minerals, cost)) {
            this._queue.enqueue({
                complete: () => this._miners++,
                duration: 1000,
            });
            this._storage.decrement(ResourceType.minerals, cost);
        }
    }

    @action.bound
    public printPrinter() {
        const cost = 50;
        if (this._storage.has(ResourceType.minerals, cost)) {
            this._queue.enqueue({
                complete: () => this._printers.push(new Printer(this._queue)),
                duration: 2000,
            });
            this._storage.decrement(ResourceType.minerals, cost);
        }
    }

    public update(delta: number) {
        if (!this.operational) {
            return;
        }

        const mineCapacity = delta * this._minerSpeed();
        const minedMinerals = Math.min(mineCapacity, this._resources);

        this._resources -= minedMinerals;

        this._storage.increment(ResourceType.minerals, minedMinerals);
    }

    private _minerSpeed() {
        return this._miners * MINER_DEFAULT_SPEED;
    }

    @computed
    public get children() {
        return this.printers;
    }
}
