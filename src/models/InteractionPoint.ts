import { distanceBetween } from '../util/distanceBetween';
import { Entity } from './Entity';
import { Vector } from './Vector';

interface InteractionPointProps {
    location: Vector;
}

export class InteractionPoint extends Entity {
    private _location: Vector;
    private _radius: number = 200;

    constructor({ location }: InteractionPointProps) {
        super();
        this._location = location;
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

    public update() {}
}
