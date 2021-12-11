import {
    Printable,
    printerSnapshot,
    PrintTask,
    PrintTaskModel,
    ResourceStorage,
    ResourceStorageModel,
    ResourceType,
} from '../internal';

describe('model: PrintTask', () => {
    const snapshot = printerSnapshot;
    let printable: Printable;
    let storage: ResourceStorage;
    let task: PrintTask;
    beforeEach(() => {
        storage = ResourceStorageModel.create();
        task = PrintTaskModel.create({
            printable: snapshot,
            storage,
        });
        printable = task.printable as Printable;
    });

    it('should initialize correctly', () => {
        const {
            duration,
            id,
        } = snapshot;
        expect(task.count).toEqual(0);
        expect(task.durationPerItem).toEqual(duration);
        expect(task.maxAffordable).toEqual(0);
        expect(task.id).toEqual(id);
        expect(task.printable).toEqual(printable);
        expect(task.progress).toEqual(0);
        expect(task.progressPercentage).toEqual(0);
        expect(task.active).toEqual(false);
    });

    it('should correctly calculate max affordable', () => {
        const { cost = [] } = snapshot;

        expect(cost[0]).toEqual({
            type: ResourceType.minerals,
            amount: 100,
        });
        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 200,
            },
        ]);

        expect(task.maxAffordable).toEqual(2);
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

    it('should remove resources correctly', () => {
        expect(() => {
            task.startPrint(5);
        }).toThrow();

        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 105,
            },
        ]);
        expect(storage.numberOf(ResourceType.minerals)).toEqual(105);

        task.startPrint(task.maxAffordable);
        expect(storage.numberOf(ResourceType.minerals)).toEqual(5);
    });
});
