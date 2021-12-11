import {
    Printers,
    PrintersModel,
    printerSnapshot,
    PrintTaskModel,
    ResourceStorage,
    ResourceStorageModel,
    ResourceType,
} from '../internal';

describe('model: Printer', () => {
    let printers: Printers;
    let storage: ResourceStorage;
    beforeEach(() => {
        printers = PrintersModel.create(printerSnapshot);
        storage = ResourceStorageModel.create();
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
        const task = PrintTaskModel.create({
            printable: printerSnapshot,
            storage,
        });
        printers.addPrintOption(task);

        expect(printers.tasks).toEqual([ task ]);
    });

    it('should not update when there are no resources', () => {
        const task = PrintTaskModel.create({
            printable: printerSnapshot,
            storage,
        });
        task.setCount(task.count + 1);
        printers.add(1);
        printers.addPrintOption(task);

        printers.update(500);
        expect(task.progress).toEqual(0);
    });

    it('should update when there are resources', () => {
        const task = PrintTaskModel.create({
            printable: printerSnapshot,
            storage,
        });
        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 1000,
            },
        ]);
        task.setCount(task.count + 1);
        printers.add(1);
        printers.addPrintOption(task);

        const DELTA = 500;
        printers.update(DELTA);
        const { duration } = printerSnapshot;
        expect(task.progress).toEqual(DELTA * printers.capacityPerMs);
        expect(task.progressPercentage).toEqual(task.progress / duration);
    });
});
