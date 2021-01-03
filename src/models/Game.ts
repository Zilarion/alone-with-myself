import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from 'mobx';

import {
    assert,
    AsteroidBelt,
    Body,
    CanvasCamera,
    childrenOfEntity,
    clearCanvas,
    createSolarSystem,
    DrawableEntity,
    drawEntity,
    Entity,
    findSelectedEntity,
    InteractionPoint,
    Transporter,
    Vector,
} from '../internal';
import { inBetween } from '../util/geometry/inBetween';

const WORLD_DELTA_MINIMUM = 1000;

export class Game {
    private _entities: Entity[] = [];
    private _canvas: HTMLCanvasElement | null = null;
    private _offscreen: OffscreenCanvas | null = null;
    private _offscreenCtx: OffscreenCanvasRenderingContext2D | null = null;
    private _animationFrameId: number | null = null;
    private _lastFrame: number | null = null;
    private _camera: CanvasCamera | null = null;
    private _gameSpeed: number = 1;
    private _mousePosition: Vector = {
        x: 0,
        y: 0,
    };

    private _isClick = false;
    private _mouseDownEntity: DrawableEntity | null = null;

    private _gameDelta: number = 0;

    @observable
    private _transportSource: InteractionPoint | null = null;

    @observable
    private _selectedEntity: DrawableEntity | null = null;

    constructor() {
        this.start();

        this.addEntities(createSolarSystem({
            numberOfPlanets: 8,
            maxMoons: 4,
            numberOfAsteroidBelts: 2,
        }));
        makeObservable(this);
    }

    @action
    public setTransportSource = (point: InteractionPoint | null) => {
        this._transportSource = point;
    }

    @computed
    public get transportSource() {
        return this._transportSource;
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        const offscreen = canvas.transferControlToOffscreen();

        const offscreenCtx = offscreen.getContext('2d');
        this._offscreenCtx = offscreenCtx;
        this._offscreen = offscreen;

        assert(offscreenCtx != null, 'Failed to create offscreen canvas context');

        this._camera = new CanvasCamera({
            canvas: this.canvas,
            context: offscreenCtx,
            zoomBound: { min: 1000 },
        });

        window.addEventListener('resize', () => {
            this.offscreen.width = window.innerWidth;
            this.offscreen.height = window.innerHeight;
        });
        canvas.addEventListener('mousemove', ({
            offsetX,
            offsetY,
        }) => {
            this._mousePosition = {
                x: offsetX,
                y: offsetY,
            };
            this._isClick = false;
        });

        canvas.addEventListener('mousedown', () => {
            runInAction(() => {
                this._isClick = true;
                this._mouseDownEntity = findSelectedEntity(
                    this._entitiesUnderMouse(),
                );
            });
        });

        canvas.addEventListener('mouseup', () => {
            runInAction(() => {
                if (this._isClick) {
                    this._setSelectedEntity(this._mouseDownEntity);
                    return;
                }
                this._mouseDownEntity = null;
            });
        });
    }

    @computed
    public get selectedEntity() {
        return this._selectedEntity;
    }

    public addEntity = (entity: Entity) => {
        this._entities.push(entity);
    }

    public addEntities = (entities: Entity[]) => {
        entities.forEach(this.addEntity);
    }

    public destroy() {
        if (this._animationFrameId != null) {
            window.cancelAnimationFrame(this._animationFrameId);
        }
    }

    public get canvas() {
        assert(this._canvas != null, 'Expected canvas to be defined before usage');
        return this._canvas;
    }

    public start() {
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }

    private get camera() {
        assert(this._camera != null, 'Expected camera to be defined before usage');
        return this._camera;
    }

    private get offscreen() {
        assert(this._offscreen != null, 'Expected offscreen canvas to be defined before usage');
        return this._offscreen;
    }

    private get offscreenCtx() {
        assert(this._offscreenCtx != null, 'Expected offscreen context to be defined before usage');
        return this._offscreenCtx;
    }

    @computed
    public get entities() {
        return this._entities.reduce<Entity[]>((prev, current) => {
            return prev.concat(
                childrenOfEntity(current),
            );
        }, []);
    }

    private _entitiesUnderMouse() {
        const mousePosition = this.camera.screenToWorld(this._mousePosition);
        return this._drawableEntities.filter((entity) => {
            const isMouseOver = entity.pointIsInside(mousePosition);
            entity.mouseOver = isMouseOver;
            return isMouseOver;
        });
    }

    private _worldUpdate(dialatedDelta: number) {
        this.entities.forEach((entity) => {
            const start = performance.now();
            entity.update(dialatedDelta);

            const duration = performance.now() - start;
            if (duration > 100) {
                console.warn('Entity update took a long time', duration, entity);
            }
        });
    }

    private _update(delta: number) {
        const dialatedDelta = delta * this._gameSpeed;

        this._drawableEntities.forEach((entity) => entity.drawUpdate(dialatedDelta));

        this._gameDelta += dialatedDelta;

        if (this._gameDelta > WORLD_DELTA_MINIMUM) {
            this._worldUpdate(this._gameDelta);
            this._gameDelta = 0;
        }
    }

    private _updateMouse() {
        const entitiesUnderMouse = this._entitiesUnderMouse();
        const hasMouseOver = entitiesUnderMouse.length > 0;

        this.canvas.style.cursor = hasMouseOver ? 'pointer' : 'default';

        if (this._selectedEntity) {
            if (this._selectedEntity instanceof Body) {
                this.camera.moveTo(this._selectedEntity.position);
            } else if (this._selectedEntity instanceof AsteroidBelt) {
                this.camera.moveTo(this._selectedEntity.orbitFocus.position);
            } else if (this._selectedEntity instanceof InteractionPoint) {
                this.camera.moveTo(this._selectedEntity.position);
            } else if (this._selectedEntity instanceof Transporter) {
                this.camera.moveTo(
                    inBetween(
                        this._selectedEntity.from.position,
                        this._selectedEntity.to.position,
                    ),
                );
            }
        }
    }

    @action
    private _setSelectedEntity(entity: DrawableEntity | null) {
        if (this._selectedEntity != null) {
            this._selectedEntity.selected = false;
        }

        if (entity) {
            entity.selected = true;
        }

        this._selectedEntity = entity;

        if (this._selectedEntity instanceof InteractionPoint) {
            if (this._transportSource) {
                this._connect(this._transportSource, this._selectedEntity);
            }
        }
    }

    @action
    private _connect(source: InteractionPoint, target: InteractionPoint) {
        const transporter = source.connectTo(target);
        this._transportSource = null;
        this._setSelectedEntity(transporter);
    }

    @computed
    private get _drawableEntities(): DrawableEntity[] {
        return this.entities.filter((entity): entity is DrawableEntity => entity instanceof DrawableEntity);
    }

    private _draw() {
        if (this._canvas == null || this.offscreen.width === 0 || this.offscreen.height === 0) {
            return;
        }

        this.camera.apply();
        clearCanvas({
            context: this.offscreenCtx,
            ...this.camera.viewport,
        });

        this._updateMouse();
        this._drawableEntities.forEach((entity) => drawEntity(this.offscreenCtx, entity));

        this.camera.restore();
    }

    private _tick = (time: number) => {
        const delta = this._lastFrame ? time - this._lastFrame : 0;

        runInAction(() => {
            this._update(delta);
            this._draw();
        });

        this._lastFrame = time;
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }
}
