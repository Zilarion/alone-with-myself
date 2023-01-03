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
        case PrintableType.printer:
            return createPrinter(props);
        case PrintableType.manufacturer:
            return createManufacturer(props);
    }
}

export type PrintableSnapshot = PrinterSnapshot | ManufacturerSnapshot;
export type PrintableInstance = Printer | Manufacturer;
