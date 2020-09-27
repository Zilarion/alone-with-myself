import {
    action,
    computed,
    observable,
} from 'mobx';

import { drawEntity } from '../components';
import { CanvasCamera } from '../util/CanvasCamera';
import { childrenOfEntity } from '../util/childrenOfEntity';
import { clearCanvas } from '../util/clearCanvas';
import { createSolarSystem } from '../util/createSolarSystem';
import { findSelectedEntity } from '../util/findSelectedEntity';
import { AsteroidBelt } from './AsteroidBelt';
import { Body } from './Body';
import { Entity } from './Entity';
import { InteractionPoint } from './InteractionPoint';
import { Vector } from './Vector';

export class Game {
    @observable private _entities: Entity[] = [];
    @observable private _selectedEntity: Entity | null = null;

    private _animationFrameId: number | null = null;
    private _context: CanvasRenderingContext2D;
    private _lastFrame: number | null = null;
    private _camera: CanvasCamera;
    private _gameSpeed: number = 0.1;
    private _mousePosition: Vector = {
        x: 0,
        y: 0,
    };
    private _isClick: boolean = false;

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
        });


        canvas.addEventListener('click', () => {
            this._isClick = true;
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

    private _update(delta: number) {
        const dialatedDelta = delta * this._gameSpeed;

        const entitiesUnderMouse = this.entities.filter((entity) => {
            const mousePosition = this._camera.screenToWorld(this._mousePosition);
            const isMouseOver = entity.pointIsInside(mousePosition);
            entity.mouseOver = isMouseOver;
            return isMouseOver;
        });

        const hasMouseOver = entitiesUnderMouse.length > 0;

        if (this._isClick) {
            const newSelectedEntity = findSelectedEntity(entitiesUnderMouse);
            this._setSelectedEntity(newSelectedEntity);
        }

        this._isClick = false;

        this._context.canvas.style.cursor = hasMouseOver ? 'pointer' : 'default';

        this.entities.forEach((entity) => entity.update(dialatedDelta));

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
    private _setSelectedEntity(entity: Entity | null) {
        if (this._selectedEntity != null) {
            this._selectedEntity.selected = false;
        }

        if (entity) {
            entity.selected = true;
        }

        this._selectedEntity = entity;
    }

    private _draw() {
        clearCanvas({
            context: this._context,
            ...this._camera.viewport,
        });

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
