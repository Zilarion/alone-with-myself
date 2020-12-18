import { makeAutoObservable } from 'mobx';

import { drawEntity } from '../drawables';
import {
    assert,
    CanvasCamera,
    childrenOfEntity,
    clearCanvas,
    createSolarSystem,
    findSelectedEntity,
} from '../util';
import { AsteroidBelt } from './AsteroidBelt';
import { Body } from './Body';
import { DrawableEntity } from './DrawableEntity';
import { Entity } from './Entity';
import { InteractionPoint } from './InteractionPoint';
import { Vector } from './Vector';

const WORLD_DELTA_MINIMUM = 1000;

export class Game {
    private _entities: Entity[] = [];
    private _selectedEntity: DrawableEntity | null = null;
    private _animationFrameId: number | null = null;
    private _context: CanvasRenderingContext2D | null = null;
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

    constructor() {
        this.start();

        this.addEntities(createSolarSystem({
            numberOfPlanets: 8,
            maxMoons: 4,
            numberOfAsteroidBelts: 2,
        }));
        makeAutoObservable(this);
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (ctx == null) {
            throw Error('Expected context to exist');
        }

        this._camera = new CanvasCamera({
            context: ctx, zoomBound: { min: 1000 },
        });
        this._context = ctx;

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
            this._isClick = true;
            this._mouseDownEntity = findSelectedEntity(
                this._entitiesUnderMouse(),
            );
        });

        canvas.addEventListener('mouseup', () => {
            if (this._isClick) {
                this._setSelectedEntity(this._mouseDownEntity);
                return;
            }
            const targetEntity = findSelectedEntity(
                this._entitiesUnderMouse(),
            );

            if (
                this._mouseDownEntity instanceof InteractionPoint &&
                targetEntity instanceof InteractionPoint
            ) {
                this._mouseDownEntity.connectTo(
                    targetEntity,
                );
            }

            this._mouseDownEntity = null;
        });
    }

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

    public start() {
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }

    private get camera() {
        assert(this._camera != null, 'Expected camera to be defined before usage');
        return this._camera;
    }

    private get context() {
        assert(this._context != null, 'Expected context to be defined before usage');
        return this._context;
    }

    public get entities() {
        return this._entities.reduce<Entity[]>((prev, current) => {
            return prev.concat(
                childrenOfEntity(current),
            );
        }, []);
    }

    private _entitiesUnderMouse() {
        const mousePosition = this.camera.screenToWorld(this._mousePosition);
        return this.drawableEntities.filter((entity) => {
            const isMouseOver = entity.pointIsInside(mousePosition);
            entity.mouseOver = isMouseOver;
            return isMouseOver;
        });
    }

    private _worldUpdate(dialatedDelta: number) {
        this.normalEntities.forEach((entity) => entity.update(dialatedDelta));
    }

    private _update(delta: number) {
        const dialatedDelta = delta * this._gameSpeed;

        this.drawableEntities.forEach((entity) => entity.update(dialatedDelta));

        this._gameDelta += dialatedDelta;

        if (this._gameDelta > WORLD_DELTA_MINIMUM) {
            this._worldUpdate(this._gameDelta);
            this._gameDelta = 0;
        }
    }

    private _updateMouse() {
        const entitiesUnderMouse = this._entitiesUnderMouse();
        const hasMouseOver = entitiesUnderMouse.length > 0;

        this.context.canvas.style.cursor = hasMouseOver ? 'pointer' : 'default';

        if (this._selectedEntity) {
            if (this._selectedEntity instanceof Body) {
                this.camera.moveTo(this._selectedEntity.position);
            } else if (this._selectedEntity instanceof AsteroidBelt) {
                this.camera.moveTo(this._selectedEntity.orbitFocus.position);
            } else if (this._selectedEntity instanceof InteractionPoint) {
                this.camera.moveTo(this._selectedEntity.location);
            }
        }
    }

    private _setSelectedEntity(entity: DrawableEntity | null) {
        if (this._selectedEntity != null) {
            this._selectedEntity.selected = false;
        }

        if (entity) {
            entity.selected = true;
        }

        this._selectedEntity = entity;
    }

    private get drawableEntities(): DrawableEntity[] {
        return this.entities.filter((entity) => entity instanceof DrawableEntity) as DrawableEntity[];
    }

    private get normalEntities() {
        return this.entities.filter((entity) => !(entity instanceof DrawableEntity));
    }

    private _draw() {
        if (this._context == null) {
            return;
        }

        this.camera.apply();
        clearCanvas({
            context: this.context,
            ...this.camera.viewport,
        });

        this._updateMouse();
        this.entities.forEach((entity) => drawEntity(this.context, entity));

        this.camera.restore();
    }

    private _tick = (time: number) => {
        const delta = this._lastFrame ? time - this._lastFrame : 0;

        this._update(delta);

        this._draw();

        this._lastFrame = time;
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }
}
