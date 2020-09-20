import { observable } from 'mobx';

export enum ResourceType {
    power,
    minerals,
}

export class ResourceStorage {
    @observable
    private _resources = new Map<ResourceType, number>();

    public has(type: ResourceType, amount: number) {
        const currentValue = this._resources.get(type) ?? 0;
        return amount <= currentValue;
    }

    public decrement(type: ResourceType, amount: number) {
        this.increment(type, -amount);
    }

    public increment(type: ResourceType, amount: number) {
        const currentValue = this._resources.get(type) ?? 0;
        this._resources.set(type, amount + currentValue);
    }

    public numberOf(type: ResourceType) {
        return this._resources.get(type) ?? 0;
    }
}
