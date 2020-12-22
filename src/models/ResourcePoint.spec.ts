import {
    EntityType,
    PrintableType,
    ResourcePoint,
    ResourceSet,
    ResourceType,
} from '../internal';

describe('model: ResourcePoint', () => {
    let point: ResourcePoint;
    let resources: ResourceSet;
    beforeEach(() => {
        resources = [ {
            type: ResourceType.minerals,
            amount: 100,
        } ];
        point = new ResourcePoint({
            location: {
                x: 0,
                y: 0,
            },
            resources,
        });
    });

    it('should initialize correctly', () => {
        expect(point.type).toEqual(EntityType.InteractionPoint);
        expect(point.printers).toBeDefined();
        expect(point.harvesters.length).toEqual(1);
        expect(point.productionPerSecond).toEqual(point.harvesters[0].produces);
        expect(point.storage.resources).toEqual([]);
        expect(point.operational).toEqual(false);
        expect(point.availableTasks.length).toEqual(0);
        expect(point.resources.resources).toEqual([ [
            ResourceType.minerals,
            100,
        ] ]);
    });

    it('should activate correctly', () => {
        point.activate();

        expect(point.operational).toEqual(true);
        expect(point.availableTasks[0].printable.printableType).toEqual(PrintableType.printer);
        expect(point.availableTasks[1].printable.printableType).toEqual(PrintableType.miner);

        expect(point.availableTasks[0].printable.amount).toEqual(1);
        expect(point.availableTasks[1].printable.amount).toEqual(1);
    });

    it('should throw if activated twice', () => {
        point.activate();
        expect(() => {
            point.activate();
        }).toThrow();
    });

    it('should not update when inactive', () => {
        point.update(1000);
        expect(point.storage.resources).toEqual([]);
        expect(point.resources.resources).toEqual([ [
            ResourceType.minerals,
            100,
        ] ]);
    });

    it('should update when active', () => {
        point.activate();
        point.printers.tasks[0].count++;
        point.update(1000);

        expect(point.storage.resources).toEqual([ [
            ResourceType.minerals,
            10,
        ] ]);
        expect(point.resources.resources).toEqual([ [
            ResourceType.minerals,
            90,
        ] ]);
    });
});
