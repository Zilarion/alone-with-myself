import { findPrintableSchema } from '../data';
import { Printers } from './Printers';
import { PrintTask } from './PrintTask';
import { ResourceStorage } from './ResourceStorage';
import {
    PrintableType,
    ResourceType,
} from './types';

describe('model: Printer', () => {
    let printers: Printers;
    let storage: ResourceStorage;
    beforeEach(() => {
        printers = new Printers();
        storage = new ResourceStorage();
    });

    it('should initialize correctly', () => {
        expect(printers.capacityPerMs).toEqual(0);
        expect(printers.tasks).toEqual([]);
    });

    it('should compute capacity correctly', () => {
        const amount = 50;
        printers.add(amount);
        expect(printers.capacityPerMs).toEqual(amount / 1000);
    });

    it('should add print options correctly', () => {
        const task = new PrintTask({
            printable: new Printers(),
            storage,
        });
        printers.addPrintOption(task);

        expect(printers.tasks).toEqual([ task ]);
    });

    it('should not update when there are no resources', () => {
        const task = new PrintTask({
            printable: new Printers(),
            storage,
        });
        task.count++;
        printers.add(1);
        printers.addPrintOption(task);

        printers.update(500);
        expect(task.progress).toEqual(0);
    });

    it('should update when there are resources', () => {
        const task = new PrintTask({
            printable: new Printers(),
            storage,
        });
        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 1000,
            },
        ]);
        task.count++;
        printers.add(1);
        printers.addPrintOption(task);

        const DELTA = 500;
        printers.update(DELTA);
        const { duration } = findPrintableSchema(PrintableType.printer);
        expect(task.progress).toEqual(DELTA * printers.capacityPerMs);
        expect(task.progressPercentage).toEqual(task.progress / duration);
    });

    it('should call beforePrint for the first printable', () => {
        const task = new PrintTask({
            printable: new Printers(),
            storage,
        });

        const startPrint = jest.spyOn(task, 'startPrint');
        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 1000,
            },
        ]);
        task.count += 2;
        printers.add(1);
        printers.addPrintOption(task);

        const DELTA = 500;
        printers.update(DELTA);
        expect(startPrint).toHaveBeenCalledWith(1);
    });

    it('should call beforePrint for each printable', () => {
        const task = new PrintTask({
            printable: new Printers(),
            storage,
        });

        const startPrint = jest.spyOn(task, 'startPrint');
        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 1000,
            },
        ]);
        task.count += 2;
        printers.add(100);
        printers.addPrintOption(task);

        const DELTA = 5000;
        printers.update(DELTA);
        expect(startPrint).toHaveBeenCalledWith(2);
    });
});
