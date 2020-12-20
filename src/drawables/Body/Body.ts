import {
    DrawableEntity,
    EntityType,
} from '../../models/core';
import { Vector } from '../../models/types';
import { distanceBetween } from '../../util';
import { AsteroidBelt } from '../AsteroidBelt';
import { InteractionPoint } from '../InteractionPoint';
import { Orbit } from '../Orbit';

export interface BodyProps {
    position: Vector;
    radius: number;
    mass: number;
    orbit?: {
        radius: number;
        focus: Body;
        velocity: number;
        angle: number;
    };
    id: string;
    points?: InteractionPoint[];
}

export class Body extends DrawableEntity {
    protected _id: string;
    protected _position: Vector;
    protected _radius: number;
    protected _mass: number;
    protected _orbit?: Orbit;
    protected _color: string;
    protected _type = EntityType.PlanetaryBody
    protected _points: InteractionPoint[];
    private _satellites: (Body | AsteroidBelt)[] = [];

    constructor({
        position,
        radius,
        mass,
        orbit,
        id,
        points = [],
    }: BodyProps) {
        super();
        this._position = position;
        this._radius = radius;
        this._mass = mass;
        this._orbit = orbit;
        this._color = '#aaa';
        this._id = id;
        this._points = points;
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

    public get points() {
        return this._points;
    }

    public get satellites() {
        return this._satellites;
    }

    public addSatellite(... satellites: (Body | AsteroidBelt)[]) {
        this._satellites = this._satellites.concat(satellites);
    }

    public update = (delta: number) => {
        this._updateOrbit(delta);
    }

    public pointIsInside(vector: Vector) {
        return distanceBetween(this._position, vector) <= this._radius;
    }

    public get children() {
        return this._points;
    }

    private _updateOrbit = (delta: number) => {
        if (this._orbit == null) {
            return;
        }
        const dialate = 10;
        const s = delta / 1000 / dialate;
        const {
            angle,
            velocity,
            focus,
            radius,
        } = this._orbit;
        const newAngle = angle + velocity * s;
        this._orbit.angle = newAngle;

        this._position = {
            x: focus.position.x + radius * Math.cos(newAngle),
            y: focus.position.y + radius * Math.sin(newAngle),
        };
    }
}
