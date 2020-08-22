import { Body } from "./Body";
import { createSatelliteOf } from "../util";

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

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
        console.log("Game starting");
        this.start();

        this.addBody(sun);
        this.addBody(createSatelliteOf(sun));
        this.addBody(createSatelliteOf(sun));
        this.addBody(createSatelliteOf(sun));
    }

    public addBody = (body: Body) => {
        this._bodies.push(body);
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
        this._context.clearRect(0, 0, 1000, 1000);

        this._bodies.forEach((body) => body.update(delta));

        // Draw
        this._bodies.forEach((body) => body.draw(this._context));
        this._animationFrameId = window.requestAnimationFrame(this._draw);
        this._lastFrame = time;
    }
}
