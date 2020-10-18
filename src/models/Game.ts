import {
    action,
    computed,
    observable,
} from 'mobx';

import { drawEntity } from '../drawables';
import {
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
    @observable
    private _entities: Entity[] = [];

    @observable
    private _selectedEntity: DrawableEntity | null = null;

    private _animationFrameId: number | null = null;
    private _context: CanvasRenderingContext2D;
    private _lastFrame: number | null = null;
    private _camera: CanvasCamera;
    private _gameSpeed: number = 1;
    private _mousePosition: Vector = {
        x: 0,
        y: 0,
    };

    private _isClick = false;

    @observable
    private _mouseDownEntity: DrawableEntity | null = null;

    private _gameDelta: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (ctx == null) {
            throw Error('Expected context to exist');
        }
        canvas.addEventListener('mousemove', ({
            x, y,
        }) => {
            this._mousePosition = {
                x, y,
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

        this._camera = new CanvasCamera({
            context: ctx, zoomBound: { min: 1000 },
        });
        this._context = ctx;
        this.start();

        this.addEntities(createSolarSystem({
            numberOfPlanets: 8,
            maxMoons: 4,
            numberOfAsteroidBelts: 2,
        }));
    }

    @computed
    public get selectedEntity() {
        return this._selectedEntity;
    }

    @action.bound
    public addEntity = (entity: Entity) => {
        this._entities.push(entity);
    }

    @action.bound
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

    @computed
    public get entities() {
        return this._entities.reduce<Entity[]>((prev, current) => {
            return prev.concat(
                childrenOfEntity(current),
            );
        }, []);
    }

    private _entitiesUnderMouse() {
        const mousePosition = this._camera.screenToWorld(this._mousePosition);
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

        this._context.canvas.style.cursor = hasMouseOver ? 'pointer' : 'default';

        if (this._selectedEntity) {
            if (this._selectedEntity instanceof Body) {
                this._camera.moveTo(this._selectedEntity.position);
            } else if (this._selectedEntity instanceof AsteroidBelt) {
                this._camera.moveTo(this._selectedEntity.orbitFocus.position);
            } else if (this._selectedEntity instanceof InteractionPoint) {
                this._camera.moveTo(this._selectedEntity.location);
            }
        }
    }

    @action.bound
    private _setSelectedEntity(entity: DrawableEntity | null) {
        if (this._selectedEntity != null) {
            this._selectedEntity.selected = false;
        }

        if (entity) {
            entity.selected = true;
        }

        this._selectedEntity = entity;
    }

    @computed
    private get drawableEntities(): DrawableEntity[] {
        return this.entities.filter((entity) => entity instanceof DrawableEntity) as DrawableEntity[];
    }

    @computed
    private get normalEntities() {
        return this.entities.filter((entity) => !(entity instanceof DrawableEntity));
    }

    private _draw() {

        clearCanvas({
            context: this._context,
            ...this._camera.viewport,
        });

        this._updateMouse();
        this.entities.forEach((entity) => drawEntity(this._context, entity));
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
