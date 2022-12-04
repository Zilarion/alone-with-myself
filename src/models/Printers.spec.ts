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
        expect(printers.capacityPerSecond).toEqual(1);
        expect(printers.tasks).toEqual([]);
    });

    it('should compute capacity correctly', () => {
        const amount = 50;
        printers.printers.add(amount);
        expect(printer.amount).toEqual(51);
        expect(printers.printers.amount).toEqual(51);
        expect(printers.capacityPerSecond).toEqual((amount + 1));
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

        printers.update(0.5);
        const { duration } = printerSnapshot;
        expect(task.progress).toEqual(0.5 * printers.capacityPerSecond);
        expect(task.progressPercentage).toEqual(task.progress / duration);
    });
});
