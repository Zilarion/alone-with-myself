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
import { Vector } from './Vector';

export interface InteractionPointProps {
    location: Vector;
}

export abstract class InteractionPoint extends Entity {
    protected _type = EntityType.InteractionPoint;
    private _location: Vector;
    private _radius: number = 200;

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

    public abstract update(delta: number): void;
}
