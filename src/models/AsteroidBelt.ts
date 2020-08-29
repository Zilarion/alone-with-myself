import { FULL_CIRCLE } from '../constants';
import { distanceBetween } from '../util/distanceBetween';
import { emptyArray } from '../util/emptyArray';
import { Body } from './Body';
import { Entity } from './Entity';
import { InteractionPoint } from './InteractionPoint';
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
    private _interactionPoints: InteractionPoint[];

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

        this._interactionPoints = emptyArray(3).map(() => {
            const angle = Math.random() * FULL_CIRCLE;
            const distance = (Math.random() - 0.5) * width + orbitCenter;

            return new InteractionPoint({
                location: {
                    x: orbitFocus.position.x + distance * Math.cos(angle),
                    y: orbitFocus.position.y + distance * Math.sin(angle),
                },
            });
        });
    }

    public get interactionPoints() {
        return this._interactionPoints;
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
