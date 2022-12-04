import { createStore } from 'solid-js/store';

import { assert } from '../util/assert';
import { multiplyResources } from '../util/multiplyResources';
import { resourcesInStorage } from '../util/resourcesInStorage';
import { IPrintable } from './IPrintable';
import { ResourceStorage } from './ResourceStorage';
import { PrintableType } from './types/PrintableType';
import { ResourceSet } from './types/ResourceSet';

export interface ManufacturerSnapshot extends IPrintable {
    type: PrintableType.manufacturer;
    produces: ResourceSet;
    consumes: ResourceSet;
}

export interface Manufacturer extends ReturnType<typeof createManufacturer> {}

export function createManufacturer({
    type,
    cost,
    id,
    duration,
    amount = 0,
    produces,
    consumes,
}: ManufacturerSnapshot) {
    const [ store, setStore ] = createStore({
        type,
        cost,
        id,
        duration,
        amount,
        produces,
        consumes,
        get totalProduction() {
            return multiplyResources(this.produces, this.amount);
        },
        get totalConsumption() {
            return multiplyResources(this.consumes, this.amount);
        },

        manufactureOver(
            delta: number,
            storage: ResourceStorage,
        ) {
            const consumedResources = multiplyResources(
                this.consumes,
                this.amount * delta
            );
            const producedResources = multiplyResources(
                this.produces,
                this.amount * delta
            );

            if (!resourcesInStorage(storage, consumedResources)) {
                return {
                    consumedResources: [],
                    producedResources: [],
                };
            }

            return {
                consumedResources,
                producedResources,
            };
        },

        maxAffordable(storage: ResourceStorage) {
            return Math.floor(
                resourcesInStorage(
                    storage,
                    store.cost,
                ),
            );
        },
        add(increment: number) {
            assert(this.amount + increment >= 0, 'An attempt was made to decrease a printable below zero.');
            setStore('amount', this.amount + increment);
        },
    });

    return store;
}
