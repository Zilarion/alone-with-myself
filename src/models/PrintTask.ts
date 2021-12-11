import {
    Instance,
    types,
} from 'mobx-state-tree';

import {
    assert,
    multiplyResources,
    PrintableModel,
    resourcesInStorage,
    ResourceStorageModel,
} from '../internal';

export const PrintTaskModel = types
    .model('PrintTask', {
        count: types.optional(types.number, 0),
        progress: types.optional(types.number, 0),
        storage: ResourceStorageModel,
        printable: PrintableModel,
    })
    .views(self => ({
        get durationPerItem() {
            return self.printable.duration;
        },
        get maxAffordable() {
            return Math.floor(
                resourcesInStorage(
                    self.storage,
                    self.printable.cost,
                ),
            );
        },
        get active() {
            return self.count > 0 && self.progress > 0;
        },
        get id() {
            return self.printable.id;
        },
        get progressPercentage() {
            if (self.count === 0) {
                return 0;
            }

            return self.progress / this.durationPerItem;
        },
    }))
    .actions(self => ({
        startPrint(amount: number) {
            assert(self.maxAffordable >= amount, 'Attempting to print more than affordable.');
            self.storage.decrement(
                multiplyResources(
                    self.printable.cost,
                    amount,
                ),
            );
        },
        setCount(newValue: number) {
            self.count = newValue;
        },
        setProgress(newValue: number) {
            self.progress = newValue;
        },
    }));

export interface PrintTask extends Instance<typeof PrintTaskModel> {}
