import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import { findPrintableSchema } from '../data';
import {
    Entity,
    EntityType,
} from './core';
import { PrintableType } from './PrintableType';
import { ResourceSet } from './ResourceSet';

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
    public add(increment: number) {
        this._amount += increment;
    }

    @computed
    public get cost() {
        return this._cost;
    }

    @computed
    public get duration() {
        return this._duration;
    }

    @computed
    public get name() {
        return this._name;
    }

    @computed
    public get amount() {
        return this._amount;
    }

    @computed
    public get printableType() {
        return this._printableType;
    }

    public update(_delta: number) {}
}
