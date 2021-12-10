import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    assert,
    Entity,
    EntityType,
    findPrintableSchema,
    PrintableType,
    ResourceSet,
} from '../internal';

export interface PrintableSchema {
    cost: ResourceSet;
    duration: number;
    name: string;
}

export interface PrintableProps {
    type: PrintableType;
}

export class Printable extends Entity {
    protected _type = EntityType.Printable;

    private _printableType: PrintableType;

    @observable
    private _cost: ResourceSet;

    @observable
    private _duration: number;

    @observable
    private _name: string;

    @observable
    private _amount: number = 0;

    constructor({ type }: PrintableProps) {
        super();

        this._printableType = type;

        const {
            cost,
            duration,
            name,
        } = findPrintableSchema(type);

        this._cost = cost;
        this._duration = duration;
        this._name = name;

        makeObservable(this);
    }

    @action.bound
    add(increment: number) {
        assert(this._amount + increment >= 0, 'An attempt was made to decrease a printable below zero.');
        this._amount += increment;
    }

    @computed
    get cost() {
        return this._cost;
    }

    @computed
    get duration() {
        return this._duration;
    }

    @computed
    get name() {
        return this._name;
    }

    @computed
    get amount() {
        return this._amount;
    }

    @computed
    get printableType() {
        return this._printableType;
    }

    update(_delta: number) {}
}
