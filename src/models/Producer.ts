import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import { Harvester } from './Harvester';
import { ResourceSet } from './ResourceSet';
import { ResourceStorage } from './ResourceStorage';
import { ResourceType } from './ResourceType';

export class Producer {
    @observable
    private _consumables: ResourceStorage;

    constructor(consumables: ResourceSet) {
        this._consumables = new ResourceStorage(consumables);
        makeObservable(this);
    }

    @computed
    public get consumables() {
        return this._consumables;
    }

    public productionOver(
        delta: number,
        harvesters: Harvester[],
    ): ResourceSet {
        const production = new Map<ResourceType, number>();

        harvesters.forEach((harvester) => {
            harvester.produces.forEach(({
                type,
                amount,
            }) => {
                const currentOfResource = production.get(type) ?? 0;
                const productionForResource = amount * delta;
                const available = this._consumables.numberOf(type);
                const additionToResource = Math.min(productionForResource, available);

                production.set(type, currentOfResource + additionToResource);
            });
        });

        return Array.from(production.entries()).map(([ type, amount ]) => ({
            type,
            amount,
        }));
    }

    @action.bound
    public consume(resources: ResourceSet) {
        this._consumables.decrement(resources);
    }
}
