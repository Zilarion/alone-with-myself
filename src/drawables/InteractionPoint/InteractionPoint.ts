import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    assert,
    distanceBetween,
    DrawableEntity,
    Entity,
    EntityType,
    Printable,
    PrintableType,
    ResourceStorage,
    Transporter,
    Vector,
} from '../../internal';

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
    private _incoming: Transporter[] = [];

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

    @computed
    public get incoming() {
        return this._incoming;
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

    @action.bound
    public connectTo(target: InteractionPoint): void {
        const transporter = new Transporter(this, target);

        this.addOutgoing(transporter);
        target.addIncoming(transporter);
    }

    @action.bound
    public addIncoming(transporter: Transporter): void {
        assert(transporter.to === this, 'Expected transporter to arrive at this point.');
        this._incoming.push(transporter);
    }

    @action.bound
    public addOutgoing(transporter: Transporter): void {
        assert(transporter.from === this, 'Expected transporter to come from this point.');
        this._outgoing.push(transporter);
    }

    public abstract update(delta: number): void;
}
