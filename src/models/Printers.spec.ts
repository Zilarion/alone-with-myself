import {
    Printers,
    printerSnapshot,
    Satellite,
    SatelliteModel,
} from 'src/internal';

describe('model: Printer', () => {
    let printers: Printers;
    let satellite: Satellite;
    beforeEach(() => {
        satellite = SatelliteModel.create({
            name: 'satellite',
            storage: {},
            totalSatelliteResources: {},
            printers: { printers: printerSnapshot.id },
            printables: [ printerSnapshot ],
        });
        printers = satellite.printers;
    });

    it('should initialize correctly', () => {
        expect(printers.capacityPerMs).toEqual(0);
        expect(printers.tasks).toEqual([]);
    });

    it('should compute capacity correctly', () => {
        const amount = 50;
        printers.printers.add(amount);
        expect(printers.capacityPerMs).toEqual(amount / 1000);
    });

    it('should add print tasks correctly', () => {
        printers.addPrintTask({
            printable: printerSnapshot.id,
            count: 5,
        });
        printers.printers.add(1);

        expect(printers.tasks.length).toEqual(1);
        expect(printers.tasks[0].count).toEqual(5);
        expect(printers.tasks[0].printable).toEqual(satellite.printables[0]);
    });

    it('should update correctly', () => {
        printers.printers.add(1);
        printers.addPrintTask({
            printable: printerSnapshot.id,
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
