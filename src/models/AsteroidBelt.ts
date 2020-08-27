import { Body } from './Body';
import { Entity } from './Entity';

export class AsteroidBelt extends Entity {
    private _bodies: Body[];

    constructor(bodies: Body[]) {
        super();
        this._bodies = bodies;
    }


    public get bodies() {
        return this._bodies;
    }

    public update(delta: number) {
        this._bodies.forEach((body) => body.update(delta));
        return;
    }
}
