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
    let miner: Harvester;
    beforeEach(() => {
        miner = createHarvester(snapshot);
    });

    it('should initialize correctly', () => {
        const {
            id,
            duration,
            cost,
        } = snapshot;
        expect(miner.type).toEqual(PrintableType.harvester);
        expect(miner.cost).toEqual(cost);
        expect(miner.duration).toEqual(duration);
        expect(miner.id).toEqual(id);
        expect(miner.amount).toEqual(0);
    });

    it('should add to the amount', () => {
        expect(miner.amount).toEqual(0);
        miner.add(0);
        expect(miner.amount).toEqual(0);

        miner.add(6);
        expect(miner.amount).toEqual(6);

        miner.add(2);
        expect(miner.amount).toEqual(8);
    });

    it('should remove from the amount', () => {
        miner.add(6);
        expect(miner.amount).toEqual(6);

        miner.add(-4);
        expect(miner.amount).toEqual(2);

        miner.add(-1);
        expect(miner.amount).toEqual(1);
    });

    it('should throw if ever going negative', () => {
        expect(() => {
            miner.add(-2);
        }).toThrow();

        miner.add(2);
        expect(miner.amount).toEqual(2);

        expect(() => {
            miner.add(-4);
        }).toThrow();
    });

    it('should produce nothing without miners', () => {
        expect(miner.totalProduction).toEqual([ {
            type: ResourceType.minerals,
            amount: 0,
        } ]);
    });

    it('should harvest the maximum amount if it is available', () => {
        const storage = createResourceStorage({
            resources: [ {
                type: ResourceType.minerals,
                amount: 10,
            } ],
        });
        miner.add(100);
        const production = miner.harvestingOver(1000, storage);

        expect(production).toEqual([ {
            type: ResourceType.minerals,
            amount: 10,
        } ]);
    });

    it('should harvest nothing if the storage is empty', () => {
        const storage = createResourceStorage({});
        miner.add(1);
        const production = miner.harvestingOver(1000, storage);

        expect(production).toEqual([]);
    });

    it('should harvest part of the storage up to the max', () => {
        const storage = createResourceStorage({
            resources: [ {
                type: ResourceType.minerals,
                amount: 0.5,
            } ],
        });
        miner.add(1);
        const production = miner.harvestingOver(1000, storage);

        expect(production).toEqual([ {
            type: ResourceType.minerals,
            amount: 0.5,
        } ]);
    });

    it('should produce a multiple of the amount based on the amount of miners', () => {
        miner.add(1);

        const production = snapshot.produces;
        expect(miner.totalProduction).toEqual(production);

        miner.add(4);

        expect(miner.totalProduction).toEqual(multiplyResources(production, 5));
    });
});
