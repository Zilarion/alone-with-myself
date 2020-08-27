import { drawEntity } from '../components';
import { CanvasCamera } from '../util/CanvasCamera';
import { clearCanvas } from '../util/clearCanvas';
import { createAsteroidBelt } from '../util/createAsteroidBelt';
import { createPlanet } from '../util/createPlanet';
import { Body } from './Body';
import { Entity } from './Entity';

const sun = new Body({
    position: {
        x: 0,
        y: 0,
    },
    radius: 693, // 639e3
    mass: 1989, // 10e30
    color: '#FEB813',
});

export class Game {
    private _entities: Entity[] = [];
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

        this.addEntity(sun);
        this.addEntities(createPlanet(sun, 3));
        this.addEntities(createPlanet(sun, 1));
        this.addEntities(createPlanet(sun, 0));
        this.addEntities(createPlanet(sun, 0));
        this.addEntities(createPlanet(sun, 8));
        this.addEntity(createAsteroidBelt(sun));
        this.addEntity(createAsteroidBelt(sun));
    }

    public addEntity = (entity: Entity) => {
        this._entities.push(entity);
    }

    public addEntities = (entities: Entity[]) => {
        this._entities.push(...entities);
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
        this._entities.forEach((entity) => entity.update(delta));
    }

    private _draw() {
        clearCanvas({
            context: this._context,
            ...this._camera.viewport,
        });

        this._entities.forEach((entity) => drawEntity(this._context, entity));
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
