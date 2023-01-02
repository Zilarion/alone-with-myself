import { PRINTABLES } from '../data/Printables';
import {
    createSatellite,
    Satellite,
} from './Satellite';
import { ResourceType } from './types/ResourceType';

export class Game {
    private _satellite: Satellite;
    private _animationFrameId: number | null = null;
    private _lastFrame: number | null = null;
    private _gameSpeed: number = 1;

    constructor() {
        this.start();

        this._satellite = createSatellite({
            name: 'Small asteroid',
            totalSatelliteResources: {
                resources: [
                    {
                        amount: 50000,
                        type: ResourceType.minerals,
                    },
                ],
            },
            storage: {
                resources: [
                    {
                        amount: 10,
                        type: ResourceType.minerals,
                    },
                    {
                        amount: 1,
                        type: ResourceType.power,
                    },
                ],
            },
            printables: PRINTABLES,
        });
    }

    get satellite() {
        return this._satellite;
    }

    destroy() {
        if (this._animationFrameId != null) {
            window.cancelAnimationFrame(this._animationFrameId);
        }
    }

    start() {
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    }

    private _worldUpdate(dialatedDelta: number) {
        [ this._satellite ].forEach((entity) => {
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
        const deltaInSeconds = dialatedDelta / 1000;
        this._worldUpdate(deltaInSeconds);
    }

    private _tick = (time: number) => {
        const delta = this._lastFrame ? time - this._lastFrame : 0;

        this._update(delta);

        this._lastFrame = time;
        this._animationFrameId = window.requestAnimationFrame(this._tick);
    };
}
