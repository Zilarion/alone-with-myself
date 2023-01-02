import {
    createStore,
    produce,
} from 'solid-js/store';

import { assert } from '../util/assert';
import { ResourceSet } from './types/ResourceSet';
import { ResourceType } from './types/ResourceType';

export interface ResourceStorageSnapshot {
    resources?: ResourceSet;
}

export type ResourceStorage = ReturnType<typeof createResourceStorage>;

export function createResourceStorage({ resources: initialResources = [] }: ResourceStorageSnapshot) {
    const [ store, setStore ] = createStore({
        resources: initialResources,
        findOrNull(type: ResourceType) {
            return store.resources.find(resource => resource.type === type);
        },
        numberOf: (type: ResourceType) => store.findOrNull(type)?.amount ?? 0,

        decrement(resources: ResourceSet) {
            resources.forEach(({
                type,
                amount,
            }) => incrementType(type, -amount));
        },
        increment(resources: ResourceSet) {
            resources.forEach(({
                type,
                amount,
            }) => incrementType(type, amount));
        },
    });

    function incrementType(
        type: ResourceType,
        amount: number
    ) {
        const currentValue = store.numberOf(type);
        const newValue = amount + currentValue;
        assert(newValue >= 0, `Attempted to decrease ${type} below zero.`);
        const entry = store.findOrNull(type);
        if (entry) {
            setStore(
                'resources',
                store.resources.map(r => r === entry ? {
                    ...entry,
                    amount: newValue,
                } : r)
            );
            return;
        }

        setStore(
            produce(state => {
                state.resources.push({
                    type,
                    amount: newValue,
                });
            })
        );
    }

    return store;
}
