import {
    createPrinter,
    Printer,
} from './Printer';
import { PrintableType } from './types/PrintableType';
import { ResourceType } from './types/ResourceType';

describe('model: Printer', () => {
    let printer: Printer;
    beforeEach(() => {
        printer = createPrinter({
            type: PrintableType.printer,
            duration: 1000,
            id: 'printer',
            cost: [ {
                amount: 10,
                type: ResourceType.minerals,
            } ],
        });
    });

    it('should initialize correctly', () => {
        expect(printer.amount).toEqual(0);
        expect(printer.cost).toEqual([ {
            amount: 10,
            type: ResourceType.minerals,
        } ]);
        expect(printer.duration).toEqual(1000);
        expect(printer.id).toEqual('printer');
        expect(printer.type).toEqual(PrintableType.printer);
    });

    it('should add new printables', () => {
        printer.add(5);
        expect(printer.amount).toEqual(5);

        printer.add(3);
        expect(printer.amount).toEqual(8);
    });

    it('should remove printables', () => {
        printer.add(5);
        expect(printer.amount).toEqual(5);

        printer.add(-3);
        expect(printer.amount).toEqual(2);
    });

    it('should throw when printables are removed below zero', () => {
        expect(() => {
            printer.add(-3);
        }).toThrow();
    });
});
