import { printerSnapshot } from '../data/Printables';
import { PrintableInstance } from './PrintableUnion';
import { createPrinter } from './Printer';
import {
    createPrintTask,
    PrintTask,
} from './PrintTask';

describe('model: PrintTask', () => {
    const snapshot = printerSnapshot;
    let printable: PrintableInstance;
    let task: PrintTask;
    beforeEach(() => {
        printable = createPrinter(printerSnapshot);
        task = createPrintTask({
            printable,
            count: 0,
            progress: 0,
        });
    });

    it('should initialize correctly', () => {
        const {
            duration,
            id,
        } = snapshot;
        expect(task.count).toEqual(0);
        expect(task.durationPerItem).toEqual(duration);
        expect(task.id).toEqual(id);
        expect(task.printable).toEqual(printable);
        expect(task.progress).toEqual(0);
        expect(task.progressPercentage).toEqual(0);
        expect(task.active).toEqual(false);
    });

    it('should calculate progress correctly', () => {
        const { duration } = snapshot;
        const progress = 50;

        task.setProgress(progress);
        task.setCount(1);
        expect(task.progressPercentage).toEqual(progress / duration);

        task.setCount(10);
        expect(task.progressPercentage).toEqual(progress / duration);
    });

    it('should return active correctly', () => {
        task.setCount(task.count + 1);
        expect(task.active).toEqual(false);

        task.setProgress(1);
        expect(task.active).toEqual(true);

        task.setCount(0);
        expect(task.active).toEqual(false);
    });
});
