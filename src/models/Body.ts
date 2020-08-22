import { Vector } from "./Vector";

interface BodyProps {
    position: Vector;
    radius: number;
    mass: number;
    orbit?: {
        radius: number;
        focus: Vector;
        velocity: number;
        angle: number;
    };
    color: string;
}

export class Body {
    private _position: Vector;
    private _radius: number;
    private _mass: number;
    private _orbit?: {
        radius: number;
        focus: Vector;
        velocity: number;
        angle: number;
    };
    private _color: string;

    constructor({
        position,
        radius,
        mass,
        orbit,
        color,
    }: BodyProps) {
        this._position = position;
        this._radius = radius;
        this._mass = mass;
        this._orbit = orbit;
        this._color = color;
    }

    public get position() {
        return this._position;
    }

    public get radius() {
        return this._radius;
    }

    public get mass() {
        return this._mass
    }

    public update = (delta: number) => {
        this._updateOrbit(delta);
    }

    private _updateOrbit = (delta: number) => {
        if (this._orbit == null)
            return;
        const s = delta / 1000;
        const { angle, velocity, focus, radius } = this._orbit;
        const newAngle = angle + velocity * s;
        this._orbit.angle = newAngle;

        this._position = {
            x: focus.x + radius * Math.cos(newAngle),
            y: focus.y + radius * Math.sin(newAngle),
        }
    }

    private _drawOrbit(context: CanvasRenderingContext2D) {
        if (this._orbit == null) {
            return;
        }

        const { radius, focus } = this._orbit;
        context.beginPath();
        context.strokeStyle = 'rgba(100, 100, 100, 0.4)';

        context.arc(
            focus.x, focus.y,
            radius,
            0, 2 * Math.PI
        );
        context.stroke();
    }

    public draw(context: CanvasRenderingContext2D) {
        this._drawOrbit(context);

        const { x, y } = this.position;
        context.beginPath();
        context.fillStyle = this._color;
        context.arc(
            x, y,
            this.radius,
            0, 2 * Math.PI
        );
        context.fill();
    }
}
