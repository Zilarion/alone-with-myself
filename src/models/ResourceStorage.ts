import {
    action,
    observable,
} from 'mobx';

import { ResourceSet } from './ResourceSet';
import { ResourceType } from './ResourceType';

export class ResourceStorage {
    @observable
    private _resources = new Map<ResourceType, number>();

    constructor(initialResources: ResourceSet = []) {
        this.increment(initialResources);
    }

    public has(resources: ResourceSet) {
        return resources.every(({
            type,
            amount,
        }) => {
            const currentValue = this._resources.get(type) ?? 0;
            return amount <= currentValue;
        });
    }

    @action.bound
    public decrement(resources: ResourceSet) {
        resources.forEach(({
            type,
            amount,
        }) => {
            this._incrementType(type, -amount);
        });
    }


    @action.bound
    public increment(resources: ResourceSet) {
        resources.forEach(({
            type,
            amount,
        }) => {
            this._incrementType(type, amount);
        });
    }

    public numberOf(type: ResourceType) {
        return this._resources.get(type) ?? 0;
    }

    private _incrementType(type: ResourceType, amount: number) {
        const currentValue = this._resources.get(type) ?? 0;
        this._resources.set(type, amount + currentValue);
    }

    public get resources() {
        return Array.from(this._resources.keys());
    }
}
