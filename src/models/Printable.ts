import { types } from 'mobx-state-tree';

import {
    assert,
    PrintableType,
    ResourceSetModel,
} from '../internal';

export const PrintableModel = types
    .model('Printable', {
        type: types.enumeration(Object.values(PrintableType)),
        cost: ResourceSetModel,
        duration: types.number,
        id: types.identifier,
        amount: types.optional(types.number, 0),
    })
    .actions(self => ({
        add(increment: number) {
            assert(self.amount + increment >= 0, 'An attempt was made to decrease a printable below zero.');
            self.amount += increment;
        },
    }));
