import {
    Instance,
    SnapshotIn,
    types,
} from 'mobx-state-tree';
import { PrintableUnion } from 'src/internal';

export const PrintTaskModel = types
    .model('PrintTask', {
        count: types.optional(types.number, 0),
        progress: types.optional(types.number, 0),
        printable: types.reference(PrintableUnion),
    })
    .views(self => ({
        get durationPerItem() {
            return self.printable.duration;
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
        setCount(newValue: number) {
            self.count = newValue;
        },
        setProgress(newValue: number) {
            self.progress = newValue;
        },
    }));

export interface PrintTask extends Instance<typeof PrintTaskModel> {}
export interface PrintTaskSnapshot extends SnapshotIn<typeof PrintTaskModel> {}
