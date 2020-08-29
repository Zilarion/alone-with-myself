import { observable } from 'mobx';

import { distanceBetween } from '../util/distanceBetween';
import { Entity } from './Entity';
import { Vector } from './Vector';

interface BodyProps {
    position: Vector;
    radius: number;
    mass: number;
    orbit?: {
        radius: number;
        focus: Body;
        velocity: number;
        angle: number;
    };
    color: string;
}

export interface Orbit {
    radius: number;
    focus: Body;
    velocity: number;
    angle: number;
}

export class Body extends Entity {
    @observable private _id: string;
    @observable private _position: Vector;
    @observable private _radius: number;
    @observable private _mass: number;
    @observable private _orbit?: Orbit;
    @observable private _color: string;

    constructor({
        position,
        radius,
        mass,
        orbit,
        color,
    }: BodyProps) {
        super();
        this._position = position;
        this._radius = radius;
        this._mass = mass;
        this._orbit = orbit;
        this._color = color;

        this._id = (Math.random() * 10000).toString();
    }

    public get id() {
        return this._id;
    }

    public get color() {
        return this._color;
    }

    public get position() {
        return this._position;
    }

    public get radius() {
        return this._radius;
    }

    public get orbit() {
        return this._orbit;
    }

    public get mass() {
        return this._mass;
    }

    public update = (delta: number) => {
        this._updateOrbit(delta);
    }

    public pointIsInside(vector: Vector) {
        return distanceBetween(this._position, vector) <= this._radius;
    }

    private _updateOrbit = (delta: number) => {
        if (this._orbit == null) {
            return;
        }
        const s = delta / 1000;
        const {
            angle, velocity, focus, radius,
        } = this._orbit;
        const newAngle = angle + velocity * s;
        this._orbit.angle = newAngle;

        this._position = {
            x: focus.position.x + radius * Math.cos(newAngle),
            y: focus.position.y + radius * Math.sin(newAngle),
        };
    }
}
