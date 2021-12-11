import {
    Instance,
    SnapshotIn,
    types,
} from 'mobx-state-tree';

import { PrintableType } from '../internal';
import { PrintableModel } from './Printable';

export const PrinterModel = types
    .compose(
        PrintableModel,
        types.model({ type: types.literal(PrintableType.printer) })
    )
    .named('Printer')
    .views(self => ({
        get capacityPerMs() {
            return self.amount / 1000;
        },
    }));

export interface Printer extends Instance<typeof PrinterModel> {}
export interface PrinterSnapshot extends SnapshotIn<typeof PrinterModel> {}
