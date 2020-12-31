import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    assert,
    Body,
    distanceBetween,
    DrawableEntity,
    Entity,
    EntityType,
    ResourceStorage,
    Transporter,
    Vector,
} from '../../internal';

export type InteractionPointProps = {
    position: Vector;
} | {
    parent: Body;
    scaleToParent?: boolean;
}

export abstract class InteractionPoint extends DrawableEntity {
    protected _type = EntityType.InteractionPoint;

    private _position: Vector;

    private _radius: number = 200;

    private _scaleToParent: boolean = true;

    private _parent: Body | null = null;

    @observable
    private _outgoing: Transporter[] = [];

    @observable
    private _incoming: Transporter[] = [];

    @observable
    private _storage: ResourceStorage = new ResourceStorage();

    constructor(props: InteractionPointProps) {
        super();
        if ('parent' in props) {
            this._parent = props.parent;
            this._position = props.parent.position;
            this._scaleToParent = props.scaleToParent ?? true;
            if (this._scaleToParent) {
                this._radius = props.parent.radius / 2;
            }
            this._updatePositionToParent();
        } else {
            this._position = props.position;
        }
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

    public set position(value: Vector) {
        this._position = value;
    }

    public get size() {
        return this._radius * 2;
    }

    public get position() {
        return this._position;
    }

    public pointIsInside(vector: Vector) {
        return distanceBetween(vector, this.position) <= this._radius;
    }

    @computed
    public get children(): Entity[] {
        return [
            ... super.children,
            ... this.outgoing,
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
    public drawUpdate(_delta: number) {
        this._updatePositionToParent();
    }

    private _updatePositionToParent() {
        if (this._parent == null) {
            return;
        }
        const {
            position,
            radius,
        } = this._parent;

        if (this._scaleToParent) {
            this._position = {
                x: position.x + radius + this._radius * 2,
                y: position.y,
            };
        } else {
            this.position = position;
        }
    }
}
