import { Body } from "./Body";
import { createPlanet } from "../util/createPlanet";

const sun = new Body({
    position: {
        x: 500, y: 500,
    },
    radius: 30,
    mass: 100,
    color: "#FEB813"
});

export class Game {
    private _bodies: Body[] = [];
    private _animationFrameId: number | null = null;
    private _context: CanvasRenderingContext2D;
    private _lastFrame: number | null = null;
    private _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;

        const ctx = canvas.getContext('2d');
        if (ctx == null) {
            throw Error("Expected context to exist");
        }
        this._context = ctx;
        this.start();

        this.addBody(sun);
        this.addBodies(createPlanet(sun, 3));
        this.addBodies(createPlanet(sun, 1));
        this.addBodies(createPlanet(sun, 0));
        this.addBodies(createPlanet(sun, 0));
        this.addBodies(createPlanet(sun, 8));
    }

    public addBody = (body: Body) => {
        this._bodies.push(body);
    }

    public addBodies = (bodies: Body[]) => {
        this._bodies.push(...bodies);
    }

    public destroy() {
        if (this._animationFrameId != null)
            window.cancelAnimationFrame(this._animationFrameId);
    }

    public start() {
        this._animationFrameId = window.requestAnimationFrame(this._draw);
    }

    private _draw = (time: number) => {
        const delta = this._lastFrame ? time - this._lastFrame : 0;
        this._context.fillStyle = "black";
        const { width, height } = this._canvas.getBoundingClientRect();
        this._context.fillRect(0, 0, width, height);


        this._bodies.forEach((body) => body.update(delta));

        this._bodies.forEach((body) => body.draw(this._context));
        this._animationFrameId = window.requestAnimationFrame(this._draw);
        this._lastFrame = time;
    }
}
