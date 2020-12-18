import {
    computed,
    makeObservable,
    observable,
} from 'mobx';

import { distanceToSegment } from '../util/geometry';
import { DrawableEntity } from './DrawableEntity';
import { EntityType } from './Entity';
import { InteractionPoint } from './InteractionPoint';
import { ResourceSet } from './ResourceSet';
import { ResourceType } from './ResourceType';
import { Vector } from './Vector';

const TRANSPORTER_WIDTH = 200;

export class Transporter extends DrawableEntity {
    protected _type = EntityType.Transporter;

    @observable
    private _from: InteractionPoint;

    @observable
    private _to: InteractionPoint;

    private _speed: ResourceSet = [];

    constructor(from: InteractionPoint, to: InteractionPoint) {
        super();
        this._from = from;
        this._to = to;
        makeObservable(this);
    }

    @computed
    public get from() {
        return this._from;
    }

    @computed
    public get to() {
        return this._to;
    }

    @computed
    public get speed() {
        return this._speed;
    }

    public update(delta: number) {
        const transportedResources = [ {
            type: ResourceType.minerals,
            amount: 0.1 * delta,
        } ];

        this._from.storage.decrement(transportedResources);
        this._to.storage.increment(transportedResources);
    }

    public pointIsInside(p: Vector) {
        const v = this._from.location;
        const w = this._to.location;

        return distanceToSegment(p, v, w) < TRANSPORTER_WIDTH;
    }
}
