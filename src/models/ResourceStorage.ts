import {
    Instance,
    SnapshotIn,
    types,
} from 'mobx-state-tree';

import {
    assert,
    ResourceSet,
    ResourceSetModel,
    ResourceType,
} from '../internal';
import { assertDefined } from '../util/assertDefined';

export const ResourceStorageModel = types
    .model('ResourceStorage', { resources: ResourceSetModel })
    .views(self => ({
        findOrNull(type: ResourceType) {
            return self.resources.find(resource => resource.type === type);
        },
    }))
    .views(self => ({
        find(type: ResourceType) {
            return assertDefined(self.findOrNull(type));
        },
        has(resources: ResourceSet | SnapshotIn<ResourceSet> = []) {
            return resources.every(({
                type,
                amount,
            }) => {
                const currentValue = this.numberOf(type);
                return amount <= currentValue;
            });
        },
        numberOf(type: ResourceType) {
            return self.findOrNull(type)?.amount ?? 0;
        },
    }))
    .actions(self => {
        function incrementType(type: ResourceType, amount: number) {
            const currentValue = self.numberOf(type);
            const newValue = amount + currentValue;
            assert(newValue >= 0, `Attempted to decrease ${type} below zero.`);
            const entry = self.findOrNull(type);
            if (entry) {
                entry.amount = newValue;
                return;
            }

            self.resources.push({
                type,
                amount: newValue,
            });
        }

        return ({
            decrement(resources: ResourceSet | SnapshotIn<ResourceSet> = []) {
                resources.forEach(({
                    type,
                    amount,
                }) => incrementType(type, -amount));
            },
            increment(resources: ResourceSet | SnapshotIn<ResourceSet> = []) {
                resources.forEach(({
                    type,
                    amount,
                }) => incrementType(type, amount));
            },
        });
    });

export interface ResourceStorage extends Instance<typeof ResourceStorageModel> {}
