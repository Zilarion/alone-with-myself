import {
    Printable,
    PrintableType,
    PrinterModel,
    ResourceType,
} from 'src/internal';

describe('model: Printable', () => {
    let printable: Printable;
    beforeEach(() => {
        printable = PrinterModel.create({
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
        expect(printable.amount).toEqual(0);
        expect(printable.cost).toEqual([ {
            amount: 10,
            type: ResourceType.minerals,
        } ]);
        expect(printable.duration).toEqual(1000);
        expect(printable.id).toEqual('printer');
        expect(printable.type).toEqual(PrintableType.printer);
    });

    it('should add new printables', () => {
        printable.add(5);
        expect(printable.amount).toEqual(5);

        printable.add(3);
        expect(printable.amount).toEqual(8);
    });

    it('should remove printables', () => {
        printable.add(5);
        expect(printable.amount).toEqual(5);

        printable.add(-3);
        expect(printable.amount).toEqual(2);
    });

    it('should throw when printables are removed below zero', () => {
        expect(() => {
            printable.add(-3);
        }).toThrow();
    });
});
