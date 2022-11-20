import { types } from 'mobx-state-tree';

import {
    Harvester,
    HarvesterModel,
    HarvesterSnapshot,
} from './Harvester';
import {
    Manufacturer,
    ManufacturerModel,
    ManufacturerSnapshot,
} from './Manufacturer';
import {
    Printer,
    PrinterModel,
    PrinterSnapshot,
} from './Printer';

export const PrintableUnion = types.union(
    HarvesterModel,
    PrinterModel,
    ManufacturerModel,
);
export type Printable = Harvester | Printer | Manufacturer;
export type PrintableSnapshot = HarvesterSnapshot | PrinterSnapshot | ManufacturerSnapshot;
