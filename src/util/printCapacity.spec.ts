import {
    PrintableType,
    printCapacity,
    PrintTask,
    PrintTaskModel,
    ResourceSet,
    ResourceSetModel,
    ResourceStorage,
    ResourceStorageModel,
    ResourceType,
} from '../internal';

describe('util: printCapacity', () => {
    const duration = 20;

    let task: PrintTask;
    let storage: ResourceStorage;
    let printerCost: ResourceSet;
    beforeEach(() => {
        storage = ResourceStorageModel.create();
        task = PrintTaskModel.create({
            printable: {
                cost: printerCost,
                id: 'printer',
                duration,
                type: PrintableType.printer,
            },
            storage,
        });
        printerCost = ResourceSetModel.create([ {
            amount: 10,
            type: ResourceType.minerals,
        } ]);
    });

    it('should use existing progress', () => {
        task.setProgress(19.009602000000044);
        const capacity = 1.000140000000014;
        storage.increment(printerCost);
        storage.increment(printerCost);
        task.setCount(task.count + 1);

        expect(printCapacity(capacity, task)).toEqual({
            capacityLeft: 0.009742000000057649,
            progress: 0,
            numberFinished: 1,
            numberStarted: 0,
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
        task.setCount(task.count + 1);
        expect(printCapacity(1000, task)).toEqual({
            capacityLeft: 1000,
            numberFinished: 0,
            numberStarted: 0,
            progress: 0,
        });
    });

    it('should return empty when capacity passed is zero', () => {
        task.setCount(task.count + 1);
        storage.increment(printerCost);
        expect(printCapacity(0, task)).toEqual({
            capacityLeft: 0,
            numberFinished: 0,
            numberStarted: 0,
            progress: 0,
        });
    });

    it('should return the correct result when exactly finished', () => {
        task.setCount(task.count + 1);
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
        task.setCount(task.count + 1);
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
        task.setCount(task.count + 1);
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
        task.setCount(task.count + 2);
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
        task.setCount(task.count + 2);
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
        task.setCount(task.count + 1);
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
