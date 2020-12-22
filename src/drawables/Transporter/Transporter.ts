import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    distanceToSegment,
    DrawableEntity,
    EntityType,
    InteractionPoint,
    ResourceSet,
    ResourceType,
    Vector,
} from '../../internal';

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

    @action.bound
    public update(delta: number) {
        const transportedResources = [ {
            type: ResourceType.minerals,
            amount: 0.1 * delta,
        } ];

        this._from.storage.decrement(transportedResources);
        this._to.storage.increment(transportedResources);
    }
    public drawUpdate(_delta: number) {}

    public pointIsInside(p: Vector) {
        const v = this._from.location;
        const w = this._to.location;

        return distanceToSegment(p, v, w) < TRANSPORTER_WIDTH;
    }
}
