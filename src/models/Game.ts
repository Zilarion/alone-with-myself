import {
    makeAutoObservable,
    runInAction,
} from 'mobx';

import {
    childrenOfEntity,
    Entity,
    System,
} from '../internal';
import { assertDefined } from '../util/assertDefined';

const WORLD_DELTA_MINIMUM = 1000;

export class Game {
    private _entities: Entity[] = [];
    private _animationFrameId: number | null = null;
    private _lastFrame: number | null = null;
    private _gameSpeed: number = 1;
    private _gameDelta: number = 0;

    constructor() {
        this.start();

        this.addEntity(new System());
        makeAutoObservable(this);
    }

    addEntity = (entity: Entity) => {
        this._entities.push(entity);
    };

    addEntities = (entities: Entity[]) => {
        entities.forEach(this.addEntity);
    };

    destroy() {
        if (this._animationFrameId != null) {
            window.cancelAnimationFrame(this._animationFrameId);
        }
    }

    start() {
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }

    get system(): System {
        return assertDefined(
            this.entities.find((entity): entity is System => entity instanceof System)
        );
    }

    get entities() {
        return this._entities.reduce<Entity[]>((prev, current) => {
            return prev.concat(
                childrenOfEntity(current),
            );
        }, []);
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
        this._gameDelta += dialatedDelta;

        if (this._gameDelta > WORLD_DELTA_MINIMUM) {
            this._worldUpdate(this._gameDelta);
            this._gameDelta = 0;
        }
    }

    private _tick = (time: number) => {
        const delta = this._lastFrame ? time - this._lastFrame : 0;

        runInAction(() => {
            this._update(delta);
        });

        this._lastFrame = time;
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    };
}
