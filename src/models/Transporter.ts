import { computed } from 'mobx';

import {
    Entity,
    EntityType,
} from './Entity';
import { InteractionPoint } from './InteractionPoint';
import { ResourceSet } from './ResourceSet';
import { ResourceType } from './ResourceType';

export class Transporter extends Entity {
    protected _type = EntityType.Transporter;
    private _from: InteractionPoint;
    private _to: InteractionPoint;

    private _speed: ResourceSet = [];

    constructor(from: InteractionPoint, to: InteractionPoint) {
        super();
        this._from = from;
        this._to = to;
    }

    @computed
    public get from() {
        return this._from;
    }

    @computed
    public get to() {
        return this._to;
    }

    public update(delta: number) {
        const transportedResources = [ {
            type: ResourceType.minerals,
            amount: 0.1 * delta,
        } ];

        this._from.storage.decrement(transportedResources);
        this._to.storage.increment(transportedResources);
    }

    public pointIsInside(vector: Vector) {
        // TODO
        return false;
    }
}
