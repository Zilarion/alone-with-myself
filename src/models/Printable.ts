import { types } from 'mobx-state-tree';

import { assert } from '../util/assert';
import { resourcesInStorage } from '../util/resourcesInStorage';
import { ResourceStorage } from './ResourceStorage';
import { PrintableType } from './types/PrintableType';
import { ResourceSetModel } from './types/ResourceSet';

export const PrintableModel = types
    .model('Printable', {
        type: types.enumeration(Object.values(PrintableType)),
        cost: ResourceSetModel,
        duration: types.number,
        id: types.identifier,
        amount: types.optional(types.number, 0),
    })
    .views(self => ({
        maxAffordable(storage: ResourceStorage) {
            return Math.floor(
                resourcesInStorage(
                    storage,
                    self.cost,
                ),
            );
        },
    }))
    .actions(self => ({
        add(increment: number) {
            assert(self.amount + increment >= 0, 'An attempt was made to decrease a printable below zero.');
            self.amount += increment;
        },
    }));
