import { createStore } from 'solid-js/store';

import { assert } from '../util/assert';
import { multiplyResources } from '../util/multiplyResources';
import { resourcesInStorage } from '../util/resourcesInStorage';
import { IPrintable } from './IPrintable';
import { ResourceStorage } from './ResourceStorage';
import { PrintableType } from './types/PrintableType';
import { ResourceSet } from './types/ResourceSet';
import { ResourceType } from './types/ResourceType';

export interface HarvesterSnapshot extends IPrintable {
    type: PrintableType.harvester;
    produces: ResourceSet;
}

export interface Harvester extends ReturnType<typeof createHarvester> {}

export function createHarvester({
    type,
    cost,
    id,
    duration,
    amount = 0,
    produces,
}: HarvesterSnapshot) {
    const [ store, setStore ] = createStore({
        type,
        cost,
        id,
        duration,
        amount,
        produces,

        maxAffordable(storage: ResourceStorage) {
            return Math.floor(
                resourcesInStorage(
                    storage,
                    store.cost,
                ),
            );
        },
        add(increment: number) {
            assert(store.amount + increment >= 0, 'An attempt was made to decrease a printable below zero.');
            setStore('amount', store.amount + increment);
        },
        harvestingOver(
            delta: number,
            availableResources: ResourceStorage,
        ): ResourceSet {
            const production = new Map<ResourceType, number>();

            this.totalProduction.forEach((resource) => {
                const currentOfResource = production.get(resource.type) ?? 0;
                const productionForResource = store.amount * delta;
                const available = availableResources.numberOf(resource.type);
                const additionToResource = Math.min(productionForResource, available);

                if (additionToResource > 0) {
                    production.set(resource.type, currentOfResource + additionToResource);
                }
            });

            return Array.from(production.entries()).map(([ t, a ]) => ({
                type: t,
                amount: a,
            }));
        },
        get totalProduction() {
            return multiplyResources(this.produces, this.amount);
        },
    });

    return store;
}
