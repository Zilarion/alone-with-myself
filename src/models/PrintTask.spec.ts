import {
    Printable,
    printerSnapshot,
    PrintTask,
    SatelliteModel,
} from 'src/internal';

describe('model: PrintTask', () => {
    const snapshot = printerSnapshot;
    let printable: Printable;
    let task: PrintTask;
    beforeEach(() => {
        const satellite = SatelliteModel.create({
            name: 'satellite',
            storage: {},
            totalSatelliteResources: {},
            printers: {
                printers: printerSnapshot.id,
                tasks: [ { printable: printerSnapshot.id } ],
            },
            printables: [ snapshot ],
        });

        task = satellite.printers.tasks[0];
        printable = task.printable as Printable;
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
