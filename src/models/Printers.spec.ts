import { printerSnapshot } from '../data/Printables';
import {
    createPrinter,
    Printer,
} from './Printer';
import {
    createPrinters,
    Printers,
} from './Printers';

describe('model: Printer', () => {
    let printers: Printers;
    let printer: Printer;
    beforeEach(() => {
        printer = createPrinter(printerSnapshot);
        printers = createPrinters({
            printers: printer,
            tasks: [],
        });
    });

    it('should initialize correctly', () => {
        expect(printers.capacityPerMs).toEqual(1 / 1000);
        expect(printers.tasks).toEqual([]);
    });

    it('should compute capacity correctly', () => {
        const amount = 50;
        printers.printers.add(amount);
        expect(printer.amount).toEqual(51);
        expect(printers.printers.amount).toEqual(51);
        expect(printers.capacityPerMs).toEqual((amount + 1) / 1000);
    });

    it('should add print tasks correctly', () => {
        printers.addPrintTask({
            printable: printer,
            count: 5,
        });
        printers.printers.add(1);

        expect(printers.tasks.length).toEqual(1);
        expect(printers.tasks[0].count).toEqual(5);
    });

    it('should update correctly', () => {
        printers.printers.add(1);
        printers.addPrintTask({
            printable: printer,
            count: 1,
        });
        const [ task ] = printers.tasks;

        const DELTA = 500;
        printers.update(DELTA);
        const { duration } = printerSnapshot;
        expect(task.progress).toEqual(DELTA * printers.capacityPerMs);
        expect(task.progressPercentage).toEqual(task.progress / duration);
    });
});
