import {
    computed,
    makeObservable,
    observable,
} from 'mobx';

import { FULL_CIRCLE } from '../../constants';
import {
    Body,
    ResourcePoint,
} from '../../models';
import {
    DrawableEntity,
    EntityType,
} from '../../models/core';
import {
    ResourceType,
    Vector,
} from '../../models/types';
import {
    distanceBetween,
    emptyArray,
    randomInt,
} from '../../util';

interface AsteroidBeltProps {
    id: string;
    width: number;
    orbitCenter: number;
    orbitFocus: Body;
    bodies: Body[];
}

export class AsteroidBelt extends DrawableEntity {
    protected _type = EntityType.AsteroidBelt;

    @observable
    private _id: string;

    @observable
    private _bodies: Body[];

    @observable
    private _width: number;

    @observable
    private _orbitCenter: number;

    @observable
    private _orbitFocus: Body;

    @observable
    private _interactionPoints: ResourcePoint[];

    constructor({
        width,
        orbitCenter,
        bodies,
        orbitFocus,
        id,
    }: AsteroidBeltProps) {
        super();
        this._bodies = bodies;
        this._width = width;
        this._orbitCenter = orbitCenter;
        this._orbitFocus = orbitFocus;
        this._id = id;
        this._interactionPoints = emptyArray(3).map(() => {
            const angle = Math.random() * FULL_CIRCLE;
            const distance = (Math.random() - 0.5) * width + orbitCenter;
            const maxResourceCount = 1e10;
            return new ResourcePoint({
                location: {
                    x: orbitFocus.position.x + distance * Math.cos(angle),
                    y: orbitFocus.position.y + distance * Math.sin(angle),
                },
                resources: [ {
                    type: ResourceType.minerals,
                    amount: randomInt({
                        min: maxResourceCount / 2,
                        max: maxResourceCount,
                    }),
                } ],
            });
        });
        makeObservable(this);
    }

    @computed
    public get interactionPoints() {
        return this._interactionPoints;
    }

    @computed
    public get width() {
        return this._width;
    }

    @computed
    public get orbitCenter() {
        return this._orbitCenter;
    }

    @computed
    public get id() {
        return this._id;
    }

    @computed
    public get orbitFocus() {
        return this._orbitFocus;
    }

    @computed
    public get bodies() {
        return this._bodies;
    }

    public update(delta: number) {
        this._bodies.forEach((body) => body.update(delta));
        return;
    }

    public pointIsInside = (vector: Vector) => {
        const distanceFromOrbitCenter = distanceBetween(this._orbitFocus.position, vector) - this._orbitCenter;
        return Math.abs(distanceFromOrbitCenter) < this._width / 2;
    }

    @computed
    public get children() {
        return this.interactionPoints;
    }
}
