import {
    createHarvester,
    Harvester,
    HarvesterSnapshot,
} from './Harvester';
import {
    createManufacturer,
    Manufacturer,
    ManufacturerSnapshot,
} from './Manufacturer';
import {
    createPrinter,
    Printer,
    PrinterSnapshot,
} from './Printer';
import { PrintableType } from './types/PrintableType';

export function createPrintableInstance(props: PrintableSnapshot) {
    switch (props.type) {
        case PrintableType.harvester:
            return createHarvester(props);
        case PrintableType.printer:
            return createPrinter(props);
        case PrintableType.manufacturer:
            return createManufacturer(props);
    }
}

export type PrintableSnapshot = HarvesterSnapshot | PrinterSnapshot | ManufacturerSnapshot;
export type PrintableInstance = Harvester | Printer | Manufacturer;
