import {
    Instance,
    SnapshotIn,
    types,
} from 'mobx-state-tree';
import {
    multiplyResources,
    PrintableType,
    ResourceSetModel,
} from 'src/internal';

import { PrintableModel } from './Printable';

export const ManufacturerModel = types
    .compose(
        PrintableModel,
        types.model({
            type: types.literal(PrintableType.manufacturer),
            produces: ResourceSetModel,
            consumes: ResourceSetModel,
        })
    )
    .views(self => ({
        get totalProduction() {
            return multiplyResources(self.produces, self.amount);
        },
        get totalConsumption() {
            return multiplyResources(self.consumes, self.amount);
        },
    }))
    .named('Manufacturer');

export interface Manufacturer extends Instance<typeof ManufacturerModel> {}
export interface ManufacturerSnapshot extends SnapshotIn<typeof ManufacturerModel> {}
