import { types } from 'mobx-state-tree';

import {
    Harvester,
    HarvesterModel,
    HarvesterSnapshot,
    Manufacturer,
    ManufacturerModel,
    ManufacturerSnapshot,
    Printer,
    PrinterModel,
    PrinterSnapshot,
} from '../internal';
import { } from './Printer';

export const PrintableUnion = types.union(
    HarvesterModel,
    PrinterModel,
    ManufacturerModel,
);
export type Printable = Harvester | Printer | Manufacturer;
export type PrintableSnapshot = HarvesterSnapshot | PrinterSnapshot | ManufacturerSnapshot;
