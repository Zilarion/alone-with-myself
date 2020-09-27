import {
    action,
    computed,
    observable,
} from 'mobx';

import { HARVESTERS } from '../data/Harvesters';
import { assert } from '../util';
import { Harvester } from './Harvester';
import { PrintableType } from './PrintableType';
import { ResourceSet } from './ResourceSet';
import { ResourceStorage } from './ResourceStorage';
import { ResourceType } from './ResourceType';

export class Producer {
    @observable
    private _consumables: ResourceStorage;

    @observable
    private _harvesters = new Map<PrintableType, number>();

    constructor(consumables: ResourceSet) {
        this._consumables = new ResourceStorage(consumables);
    }

    @computed
    public get consumables() {
        return this._consumables;
    }

    @computed
    public get harvesters() {
        return this._harvesters;
    }

    @computed
    public get availableHarvesters(): [PrintableType, Harvester][] {
        return Array.from(HARVESTERS.entries()).filter(([ , { produces } ]) => {
            produces.some(({ type }) => {
                this._consumables.numberOf(type) > 0;
            });
        });
    }

    @action.bound
    public buildHarvester(type: PrintableType) {
        const harvester = HARVESTERS.get(type);
        assert(harvester != null, `Expected harvester of ${type} to exist`);

        const numberOfHarvesters = this._harvesters.get(type) ?? 0;
        this._harvesters.set(type, numberOfHarvesters + 1);
    }

    public productionOver(delta: number): ResourceSet {
        const production = new Map<ResourceType, number>();

        this._harvesters.forEach((amountOfHarvesters, type) => {
            const harvester = HARVESTERS.get(type);
            assert(harvester != null, `Expected harvester of ${type} to exist.`);

            harvester.produces.forEach(({
                type: resourceType,
                amount,
            }) => {
                const currentOfResource = production.get(resourceType) ?? 0;
                const additionToResource = amount * amountOfHarvesters * delta;

                production.set(resourceType, currentOfResource + additionToResource);
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
