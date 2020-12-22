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
import { multiplyResources } from '../../util/multiplyResources';

const TRANSPORTER_WIDTH = 200;

export class Transporter extends DrawableEntity {
    protected _type = EntityType.Transporter;

    @observable
    private _from: InteractionPoint;

    @observable
    private _to: InteractionPoint;

    @observable
    private _speed = new Map<ResourceType, number>();

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
    public get speed(): ResourceSet {
        return Array.from(this._speed.entries())
            .map(([ type, amount ]) => ({
                type,
                amount,
            }));
    }

    public speedOf = (type: ResourceType) => {
        return this._speed.get(type) ?? 0;
    }

    @action.bound
    public setSpeedPerSecond(type: ResourceType, amount: number) {
        this._speed.set(type, amount);
    }

    @action.bound
    public update(delta: number) {
        const deltaSeconds = delta / 1000;
        const transportedResources = multiplyResources(this.speed, deltaSeconds);
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
