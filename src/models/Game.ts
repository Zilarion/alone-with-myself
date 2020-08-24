import { createPlanet } from '../util/createPlanet';
import { BodyModel } from './BodyModel';

const sun = new BodyModel({
    position: {
        x: 500, y: 500,
    },
    radius: 30,
    mass: 100,
    color: '#FEB813',
});

export class Game {
    private _bodies: BodyModel[] = [];
    private _animationFrameId: number | null = null;
    private _lastFrame: number | null = null;

    constructor() {
        this.start();

        this.addBody(sun);
        this.addBodies(createPlanet(sun, 3));
        this.addBodies(createPlanet(sun, 1));
        this.addBodies(createPlanet(sun, 0));
        this.addBodies(createPlanet(sun, 0));
        this.addBodies(createPlanet(sun, 8));
    }

    public addBody = (body: BodyModel) => {
        this._bodies.push(body);
    }

    public addBodies = (bodies: BodyModel[]) => {
        this._bodies.push(...bodies);
    }

    public get bodies() {
        return this._bodies;
    }

    public destroy() {
        if (this._animationFrameId != null) {
            window.cancelAnimationFrame(this._animationFrameId);
        }
    }

    public start() {
        this._animationFrameId = window.requestAnimationFrame(this._update);
    }

    private _update = (time: number) => {
        const delta = this._lastFrame ? time - this._lastFrame : 0;
        this._bodies.forEach((body) => body.update(delta));
        this._animationFrameId = window.requestAnimationFrame(this._update);
        this._lastFrame = time;
    }
}
