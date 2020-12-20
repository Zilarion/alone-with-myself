import { findHarvesterSchema } from '../data/Harvesters';
import { Harvester } from './Harvester';
import { Producer } from './Producer';
import {
    PrintableType,
    ResourceType,
} from './types';

describe('model: Producer', () => {
    const MAX_RESOURCES = 100;

    let producer: Producer;
    let miner: Harvester;
    beforeEach(() => {
        producer = new Producer([ {
            amount: MAX_RESOURCES,
            type: ResourceType.minerals,
        } ]);

        miner = new Harvester(
            findHarvesterSchema(PrintableType.miner),
        );
    });

    it('should have set the consumables', () => {
        const minerals = producer.consumables.numberOf(
            ResourceType.minerals,
        );
        expect(minerals).toEqual(100);
    });

    it('should produce nothing without harvesters', () => {
        const production = producer.productionOver(100, []);
        expect(production.length).toEqual(0);
    });

    it('should return the correct production value', () => {
        const MINER_PRODUCTION = 0.01;
        const NUMER_OF_MINERS = 5;
        const DELTA = 50;

        miner.add(NUMER_OF_MINERS);
        const production = producer.productionOver(
            DELTA,
            [ miner ],
        );
        expect(production.length).toEqual(1);
        expect(production[0]).toEqual({
            type: ResourceType.minerals,
            amount: MINER_PRODUCTION * DELTA * NUMER_OF_MINERS,
        });
    });

    it('should not produce more then the available resources', () => {
        const NUMER_OF_MINERS = 100;
        const DELTA = 1000;

        miner.add(NUMER_OF_MINERS);

        const production = producer.productionOver(DELTA, [ miner ]);
        expect(production.length).toEqual(1);
        expect(production[0]).toEqual({
            type: ResourceType.minerals,
            amount: MAX_RESOURCES,
        });
    });
});
