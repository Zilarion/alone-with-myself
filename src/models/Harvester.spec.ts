import { harvesterSnapshots } from '../data/Harvesters';
import { multiplyResources } from '../util/multiplyResources';
import {
    createHarvester,
    Harvester,
} from './Harvester';
import { createResourceStorage } from './ResourceStorage';
import { PrintableType } from './types/PrintableType';
import { ResourceType } from './types/ResourceType';

describe('model: Harvester', () => {
    const snapshot = harvesterSnapshots[0];
    let collector: Harvester;
    beforeEach(() => {
        collector = createHarvester({
            ...snapshot,
            amount: 0,
        });
    });

    it('should initialize correctly', () => {
        const {
            id,
            duration,
            cost,
        } = snapshot;
        expect(collector.type).toEqual(PrintableType.harvester);
        expect(collector.cost).toEqual(cost);
        expect(collector.duration).toEqual(duration);
        expect(collector.id).toEqual(id);
        expect(collector.amount).toEqual(0);
    });

    it('should add to the amount', () => {
        expect(collector.amount).toEqual(0);
        collector.add(0);
        expect(collector.amount).toEqual(0);

        collector.add(6);
        expect(collector.amount).toEqual(6);

        collector.add(2);
        expect(collector.amount).toEqual(8);
    });

    it('should remove from the amount', () => {
        collector.add(6);
        expect(collector.amount).toEqual(6);

        collector.add(-4);
        expect(collector.amount).toEqual(2);

        collector.add(-1);
        expect(collector.amount).toEqual(1);
    });

    it('should throw if ever going negative', () => {
        expect(() => {
            collector.add(-2);
        }).toThrow();

        collector.add(2);
        expect(collector.amount).toEqual(2);

        expect(() => {
            collector.add(-4);
        }).toThrow();
    });

    it('should produce nothing without collectors', () => {
        expect(collector.totalProduction).toEqual([ {
            type: ResourceType.power,
            amount: 0,
        } ]);
    });

    it('should harvest the maximum amount if it is available', () => {
        const storage = createResourceStorage({
            resources: [ {
                type: ResourceType.power,
                amount: 10,
            } ],
        });
        collector.add(100);
        const production = collector.harvestingOver(1000, storage);

        expect(production).toEqual([ {
            type: ResourceType.power,
            amount: 10,
        } ]);
    });

    it('should harvest nothing if the storage is empty', () => {
        const storage = createResourceStorage({});
        collector.add(1);
        const production = collector.harvestingOver(1000, storage);

        expect(production).toEqual([]);
    });

    it('should harvest part of the storage up to the max', () => {
        const storage = createResourceStorage({
            resources: [ {
                type: ResourceType.power,
                amount: 0.5,
            } ],
        });
        collector.add(1);
        const production = collector.harvestingOver(1000, storage);

        expect(production).toEqual([ {
            type: ResourceType.power,
            amount: 0.5,
        } ]);
    });

    it('should produce a multiple of the amount based on the amount of collectors', () => {
        collector.add(1);

        const production = snapshot.produces;
        expect(collector.totalProduction).toEqual(production);

        collector.add(4);

        expect(collector.totalProduction).toEqual(multiplyResources(production, 5));
    });
});
