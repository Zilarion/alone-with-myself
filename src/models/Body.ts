import { distanceBetween } from '../util/distanceBetween';
import {
    Entity,
    EntityType,
} from './Entity';
import { InteractionPoint } from './InteractionPoint';
import { Vector } from './Vector';

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
    color: string;
    id: string;
    points?: InteractionPoint[];
}

export interface Orbit {
    radius: number;
    focus: Body;
    velocity: number;
    angle: number;
}

export class Body extends Entity {
    protected _id: string;
    protected _position: Vector;
    protected _radius: number;
    protected _mass: number;
    protected _orbit?: Orbit;
    protected _color: string;
    protected _type = EntityType.PlanetaryBody
    protected _points: InteractionPoint[];

    constructor({
        position,
        radius,
        mass,
        orbit,
        color,
        id,
        points = [],
    }: BodyProps) {
        super();
        this._position = position;
        this._radius = radius;
        this._mass = mass;
        this._orbit = orbit;
        this._color = color;
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
        const s = delta / 1000;
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
