import { types } from 'mobx-state-tree';

import {
    Harvester,
    HarvesterModel,
    HarvesterSnapshot,
    Manufacturer,
    ManufacturerModel,
    ManufacturerSnapshot,
    Printers,
    PrintersModel,
    PrintersSnapshot,
} from '../internal';

export const PrintableUnion = types.union(
    HarvesterModel,
    PrintersModel,
    ManufacturerModel,
);
export type Printable = Harvester | Printers | Manufacturer;
export type PrintableSnapshot = HarvesterSnapshot | PrintersSnapshot | ManufacturerSnapshot;
