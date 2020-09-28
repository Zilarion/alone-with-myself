import {
    computed,
    observable,
} from 'mobx';

import { distanceBetween } from '../util/distanceBetween';
import {
    Entity,
    EntityType,
} from './Entity';
import { ResourceStorage } from './ResourceStorage';
import { Transporter } from './Transporter';
import { Vector } from './Vector';

export interface InteractionPointProps {
    location: Vector;
}

export abstract class InteractionPoint extends Entity {
    protected _type = EntityType.InteractionPoint;
    private _location: Vector;
    private _radius: number = 200;
    private _outgoing: Transporter[] = [];

    @observable
    private _storage: ResourceStorage = new ResourceStorage();

    constructor({ location }: InteractionPointProps) {
        super();
        this._location = location;
    }

    @computed
    public get storage() {
        return this._storage;
    }

    @computed
    public get outgoing() {
        return this._outgoing;
    }

    public set location(value: Vector) {
        this.location = value;
    }

    public get size() {
        return this._radius * 2;
    }

    public get location() {
        return this._location;
    }

    public pointIsInside(vector: Vector) {
        return distanceBetween(vector, this._location) <= this._radius;
    }

    public get children(): Entity[] {
        return this._outgoing;
    }

    public connectTo(target: InteractionPoint): void {
        this._outgoing.push(new Transporter(this, target));
    }

    public abstract update(delta: number): void;
}
