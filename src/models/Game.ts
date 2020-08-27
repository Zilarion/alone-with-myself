import { drawEntity } from '../components';
import { CanvasCamera } from '../util/CanvasCamera';
import { clearCanvas } from '../util/clearCanvas';
import { createSolarSystem } from '../util/createSolarSystem';
import { Entity } from './Entity';

export class Game {
    private _entities: Entity[] = [];
    private _animationFrameId: number | null = null;
    private _context: CanvasRenderingContext2D;
    private _lastFrame: number | null = null;
    private _camera: CanvasCamera;
    private _gameSpeed: number = 1;

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (ctx == null) {
            throw Error('Expected context to exist');
        }
        this._camera = new CanvasCamera(ctx);
        this._context = ctx;
        this.start();

        this.addEntities(createSolarSystem({
            numberOfPlanets: 8,
            maxMoons: 4,
            numberOfAsteroidBelts: 1,
        }));
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
        const dialatedDelta = delta * this._gameSpeed;
        this._entities.forEach((entity) => entity.update(dialatedDelta));
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
