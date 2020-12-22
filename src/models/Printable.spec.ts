import {
    EntityType,
    findPrintableSchema,
    Printable,
    PrintableType,
} from '../internal';

describe('model: Printable', () => {

    let printable: Printable;
    beforeEach(() => {
        printable = new Printable({ type: PrintableType.printer });
    });

    it('should initialize correctly', () => {
        const {
            name,
            cost,
            duration,
        } = findPrintableSchema(PrintableType.printer);
        expect(printable.amount).toEqual(0);
        expect(printable.children).toEqual([]);
        expect(printable.cost).toEqual(cost);
        expect(printable.duration).toEqual(duration);
        expect(printable.name).toEqual(name);
        expect(printable.printableType).toEqual(PrintableType.printer);
        expect(printable.type).toEqual(EntityType.Printable);
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
