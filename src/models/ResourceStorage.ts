import {
    action,
    makeAutoObservable,
} from 'mobx';

import {
    assert,
    ResourceSet,
    ResourceType,
} from '../internal';

export class ResourceStorage {
    private _resources = new Map<ResourceType, number>();

    constructor(initialResources: ResourceSet = []) {
        this.increment(initialResources);
        makeAutoObservable(this);
    }

    has(resources: ResourceSet) {
        return resources.every(({
            type,
            amount,
        }) => {
            const currentValue = this._resources.get(type) ?? 0;
            return amount <= currentValue;
        });
    }

    @action.bound
    decrement(resources: ResourceSet) {
        resources.forEach(({
            type,
            amount,
        }) => {
            this._incrementType(type, -amount);
        });
    }

    @action.bound
    increment(resources: ResourceSet) {
        resources.forEach(({
            type,
            amount,
        }) => {
            this._incrementType(type, amount);
        });
    }

    numberOf = (type: ResourceType) => {
        return this._resources.get(type) ?? 0;
    };

    private _incrementType(type: ResourceType, amount: number) {
        const currentValue = this._resources.get(type) ?? 0;
        const newValue = amount + currentValue;
        assert(newValue >= 0, `Attempted to decrease ${type} below zero.`);
        this._resources.set(type, newValue);
    }

    get resources(): ResourceSet {
        return Array.from(this._resources.entries())
            .map(([ type, amount ]) => ({
                type,
                amount,
            }));
    }
}
