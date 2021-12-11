import {
    Harvester,
    HarvesterModel,
    harvesterSnapshots,
    Producer,
    ProducerModel,
    ResourceType,
} from '../internal';

describe('model: Producer', () => {
    const MAX_RESOURCES = 100;
    const [ snapshot ] = harvesterSnapshots;

    let producer: Producer;
    let harvester: Harvester;
    beforeEach(() => {
        producer = ProducerModel.create({
            consumables: {
                resources: [ {
                    amount: MAX_RESOURCES,
                    type: ResourceType.minerals,
                } ],
            },
        });

        harvester = HarvesterModel.create(snapshot);
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

        harvester.add(NUMER_OF_MINERS);
        const production = producer.productionOver(
            DELTA,
            [ harvester ],
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

        harvester.add(NUMER_OF_MINERS);

        const production = producer.productionOver(DELTA, [ harvester ]);
        expect(production.length).toEqual(1);
        expect(production[0]).toEqual({
            type: ResourceType.minerals,
            amount: MAX_RESOURCES,
        });
    });

    it('should consume resources correctly', () => {
        producer.consume([ {
            amount: MAX_RESOURCES / 2,
            type: ResourceType.minerals,
        } ]);

        expect(producer.consumables.numberOf(ResourceType.minerals)).toEqual(MAX_RESOURCES / 2);
    });

    it('should throw if to many resources are consumed', () => {
        expect(() => {
            producer.consume([ {
                amount: MAX_RESOURCES + 1,
                type: ResourceType.minerals,
            } ]);
        }).toThrow();
    });
});
