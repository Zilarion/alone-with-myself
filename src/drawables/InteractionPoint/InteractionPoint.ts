import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    ResourceStorage,
    Transporter,
} from '../../models';
import {
    DrawableEntity,
    Entity,
    EntityType,
} from '../../models/core';
import { Printable } from '../../models/Printable';
import {
    PrintableType,
    Vector,
} from '../../models/types';
import { distanceBetween } from '../../util';

export interface InteractionPointProps {
    location: Vector;
}

export abstract class InteractionPoint extends DrawableEntity {
    protected _type = EntityType.InteractionPoint;

    private _location: Vector;

    private _radius: number = 200;

    @observable
    private _outgoing: Transporter[] = [];

    @observable
    private _printables = new Map<PrintableType, Printable>();

    @observable
    private _storage: ResourceStorage = new ResourceStorage();

    constructor({ location }: InteractionPointProps) {
        super();
        this._location = location;
        makeObservable(this);
    }

    @action.bound
    public addPrintableOption(printable: Printable) {
        this._printables.set(printable.printableType, printable);
    }

    @computed
    public get storage() {
        return this._storage;
    }

    @computed
    public get outgoing() {
        return this._outgoing;
    }

    public set location(value: Vector) {
        this.location = value;
    }

    public get size() {
        return this._radius * 2;
    }

    public get location() {
        return this._location;
    }

    @computed
    public get printables() {
        return this._printables;
    }

    public pointIsInside(vector: Vector) {
        return distanceBetween(vector, this._location) <= this._radius;
    }
    @computed
    public get children(): Entity[] {

        return [
            ... super.children,
            ... this.outgoing,
            ... Array.from(this.printables.values()),
        ];
    }

    public connectTo(target: InteractionPoint): void {
        this._outgoing.push(new Transporter(this, target));
    }

    public abstract update(delta: number): void;
}
