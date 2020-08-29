import { distanceBetween } from '../util/distanceBetween';
import { Body } from './Body';
import { Entity } from './Entity';
import { Vector } from './Vector';

interface AsteroidBeltProps {
    width: number;
    orbitCenter: number;
    orbitFocus: Body;
    bodies: Body[];
}

export class AsteroidBelt extends Entity {
    private _bodies: Body[];
    private _width: number;
    private _orbitCenter: number;
    private _orbitFocus: Body;

    constructor({
        width,
        orbitCenter,
        bodies,
        orbitFocus,
    }: AsteroidBeltProps) {
        super();
        this._bodies = bodies;
        this._width = width;
        this._orbitCenter = orbitCenter;
        this._orbitFocus = orbitFocus;
    }

    public get width() {
        return this._width;
    }

    public get orbitCenter() {
        return this._orbitCenter;
    }

    public get orbitFocus() {
        return this._orbitFocus;
    }

    public get bodies() {
        return this._bodies;
    }

    public update(delta: number) {
        this._bodies.forEach((body) => body.update(delta));
        return;
    }
    public pointIsInside = (vector: Vector) => {
        const distanceFromOrbitCenter = distanceBetween(this._orbitFocus.position, vector) - this._orbitCenter;
        return Math.abs(distanceFromOrbitCenter) < this._width / 2;
    }
}
