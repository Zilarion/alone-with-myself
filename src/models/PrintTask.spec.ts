import {
    findPrintableSchema,
    Printable,
    PrintableType,
    PrintTask,
    ResourceStorage,
    ResourceType,
} from '../internal';

describe('model: PrintTask', () => {

    let printable: Printable;
    let storage: ResourceStorage;
    let task: PrintTask;
    beforeEach(() => {
        printable = new Printable({ type: PrintableType.printer });
        storage = new ResourceStorage();
        task = new PrintTask({
            printable,
            storage,
        });
    });

    it('should initialize correctly', () => {
        const {
            duration,
            name,
        } = findPrintableSchema(PrintableType.printer);
        expect(task.count).toEqual(0);
        expect(task.durationPerItem).toEqual(duration);
        expect(task.maxAffordable).toEqual(0);
        expect(task.name).toEqual(name);
        expect(task.printable).toEqual(printable);
        expect(task.progress).toEqual(0);
        expect(task.progressPercentage).toEqual(0);
        expect(task.active).toEqual(false);
    });

    it('should correctly calculate max affordable', () => {
        const { cost } = findPrintableSchema(PrintableType.printer);

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
        const { duration } = findPrintableSchema(PrintableType.printer);
        const progress = 50;

        task.progress = progress;
        task.count = 1;
        expect(task.progressPercentage).toEqual(progress / duration);


        task.count = 10;
        expect(task.progressPercentage).toEqual(progress / duration);
    });

    it('should return active correctly', () => {
        task.count = 1;
        expect(task.active).toEqual(false);

        task.progress = 1;
        expect(task.active).toEqual(true);

        task.count = 0;
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
