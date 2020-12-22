import {
    findPrintableSchema,
    PrintableType,
    printCapacity,
    Printers,
    PrintTask,
    ResourceStorage,
} from '../internal';

describe('util: printCapacity', () => {
    const {
        cost: printerCost,
        duration,
    } = findPrintableSchema(PrintableType.printer);
    let task: PrintTask;
    let storage: ResourceStorage;

    beforeEach(() => {
        storage = new ResourceStorage();
        task = new PrintTask({
            printable: new Printers(),
            storage,
        });
    });

    it('should return empty when count is zero', () => {
        storage.increment(printerCost);
        expect(printCapacity(1000, task)).toEqual({
            capacityLeft: 1000,
            numberFinished: 0,
            numberStarted: 0,
            progress: 0,
        });
    });

    it('should return empty when resources are empty', () => {
        task.count++;
        expect(printCapacity(1000, task)).toEqual({
            capacityLeft: 1000,
            numberFinished: 0,
            numberStarted: 0,
            progress: 0,
        });
    });

    it('should return empty when capacity passed is zero', () => {
        task.count++;
        storage.increment(printerCost);
        expect(printCapacity(0, task)).toEqual({
            capacityLeft: 0,
            numberFinished: 0,
            numberStarted: 0,
            progress: 0,
        });
    });

    it('should return the correct result when exactly finished', () => {
        task.count++;
        storage.increment(printerCost);
        expect(printCapacity(duration, task)).toEqual({
            capacityLeft: 0,
            numberFinished: 1,
            numberStarted: 1,
            progress: 0,
        });
    });

    it('should throw if negative capacity is passed', () => {
        expect(() => {
            printCapacity(-100, task);
        }).toThrow();
    });

    it('should return the correct result when partially finished', () => {
        task.count++;
        storage.increment(printerCost);
        const delta = 10;
        const capacity = duration - delta;
        expect(printCapacity(capacity, task)).toEqual({
            capacityLeft: 0,
            numberFinished: 0,
            numberStarted: 1,
            progress: capacity,
        });
    });

    it('should return the correct result when there is capacity left', () => {
        task.count++;
        storage.increment(printerCost);
        const delta = 10;
        const capacity = duration + delta;
        expect(printCapacity(capacity, task)).toEqual({
            capacityLeft: delta,
            numberFinished: 1,
            numberStarted: 1,
            progress: 0,
        });
    });

    it('should return the correct result when the second is partially finished', () => {
        task.count += 2;
        storage.increment(printerCost);
        storage.increment(printerCost);
        const delta = 10;
        const capacity = duration + delta;
        expect(printCapacity(capacity, task)).toEqual({
            capacityLeft: 0,
            numberFinished: 1,
            numberStarted: 2,
            progress: delta,
        });
    });

    it('should return the correct result when the second cannot be afforded', () => {
        task.count += 2;
        storage.increment(printerCost);
        const delta = 10;
        const capacity = duration + delta;
        expect(printCapacity(capacity, task)).toEqual({
            capacityLeft: delta,
            numberFinished: 1,
            numberStarted: 1,
            progress: 0,
        });
    });

    it('should return the correct result when one to much can be afforded', () => {
        task.count++;
        storage.increment(printerCost);
        storage.increment(printerCost);
        const delta = 10;
        const capacity = duration + delta;
        expect(printCapacity(capacity, task)).toEqual({
            capacityLeft: delta,
            numberFinished: 1,
            numberStarted: 1,
            progress: 0,
        });
    });
});
