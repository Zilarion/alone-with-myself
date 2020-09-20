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
import {
    ResourceStorage,
    ResourceType,
} from './ResourceStorage';

type ResourcePointProps = {
    resources: number;
} & InteractionPointProps;

export class ResourcePoint extends InteractionPoint {
    @observable
    private _resources: number;

    @observable
    private _printers: Printer[] = [];

    @observable
    private _miners: number = 0;

    @observable
    private _operational: boolean = false;

    @observable
    private _storage: ResourceStorage;

    constructor(props: ResourcePointProps) {
        super(props);
        this._resources = props.resources;
        this._storage = new ResourceStorage();
    }

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
    public get operational() {
        return this._operational;
    }

    @action.bound
    public activate() {
        this._operational = true;
        this._miners = 1;
        this._printers.push(new Printer());
    }

    @action.bound
    public printMiner() {
        if (this._storage.has(ResourceType.minerals, 10)) {
            this._printers[0].enqueue({
                complete: () => this._miners++,
                duration: 1000,
            });
            this._storage.decrement(ResourceType.minerals, 10);
        }
    }

    public update(delta: number) {
        const mineCapacity = delta * this._minerSpeed();
        const minedMinerals = Math.min(mineCapacity, this._resources);

        this._resources -= minedMinerals;

        this._storage.increment(ResourceType.minerals, minedMinerals);
    }

    private _minerSpeed() {
        return this._miners;
    }
}
