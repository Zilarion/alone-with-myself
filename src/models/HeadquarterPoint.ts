import {
    computed,
    observable,
} from 'mobx';

import { InteractionPoint } from './InteractionPoint';
import { ResourceStorage } from './ResourceStorage';
import { Vector } from './Vector';

export class HeadquarterPoint extends InteractionPoint {
    @observable
    private _storage: ResourceStorage = new ResourceStorage();

    constructor(location: Vector) {
        super({ location });
    }

    @computed
    public get storage() {
        return this._storage;
    }

    public update(delta: number) {

    }
}
