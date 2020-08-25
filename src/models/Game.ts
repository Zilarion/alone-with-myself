import { Body } from '../components';
import { CanvasCamera } from '../util/CanvasCamera';
import { clearCanvas } from '../util/clearCanvas';
import { createPlanet } from '../util/createPlanet';
import { BodyModel } from './BodyModel';

const sun = new BodyModel({
    position: {
        x: 0,
        y: 0,
    },
    radius: 693, // 639e3
    mass: 1989, // 10e30
    color: '#FEB813',
});

export class Game {
    private _bodies: BodyModel[] = [];
    private _animationFrameId: number | null = null;
    private _context: CanvasRenderingContext2D;
    private _lastFrame: number | null = null;
    private _camera: CanvasCamera;

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (ctx == null) {
            throw Error('Expected context to exist');
        }
        this._camera = new CanvasCamera(ctx);
        this._context = ctx;
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

    public destroy() {
        if (this._animationFrameId != null) {
            window.cancelAnimationFrame(this._animationFrameId);
        }
    }

    public start() {
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }

    private _update(delta: number) {
        this._bodies.forEach((body) => body.update(delta));
    }

    private _draw() {


        clearCanvas({
            context: this._context,
            ...this._camera.viewport,
        });

        this._bodies.forEach((body) => Body(this._context, body));
    }

    private _tick = (time: number) => {
        const delta = this._lastFrame ? time - this._lastFrame : 0;

        this._update(delta);

        this._camera.apply();
        this._draw();
        this._camera.restore();

        this._lastFrame = time;
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }
}
