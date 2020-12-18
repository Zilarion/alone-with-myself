import { PrintableType } from './PrintableType';
import { Producer } from './Producer';
import { ResourceType } from './ResourceType';

describe('model: Producer', () => {
    const MAX_RESOURCES = 100;

    let producer: Producer;
    beforeEach(() => {
        producer = new Producer([ {
            amount: MAX_RESOURCES,
            type: ResourceType.minerals,
        } ]);
    });

    it('should have set the consumables', () => {
        const minerals = producer.consumables.numberOf(
            ResourceType.minerals,
        );
        expect(minerals).toEqual(100);
    });

    it('should initialize without harvesters', () => {
        expect(producer.harvesters.size).toEqual(0);
    });

    it('should have mineral harvesters available', () => {
        expect(
            producer.availableHarvesters.find(([ type ]) => type === PrintableType.miner),
        ).toExist();
    });

    it('should build harvesters', () => {
        producer.buildHarvesters(PrintableType.miner, 5);
        expect(producer.harvesters.size).toEqual(1);
        expect(producer.harvesters.get(PrintableType.miner)).toEqual(5);
    });

    it('should not build harvesters that are not available', () => {
        expect(
            producer.availableHarvesters.find(([ type ]) => type === PrintableType.printer),
        ).toBeUndefined();

        expect(() => {
            producer.buildHarvesters(PrintableType.printer, 5);
        }).toThrow();
    });

    it('should produce using the harvesters', () => {
        producer.buildHarvesters(PrintableType.miner, 5);
        expect(producer.harvesters.size).toEqual(1);
        expect(producer.harvesters.get(PrintableType.miner)).toEqual(5);
    });

    it('should produce nothing without harvesters', () => {
        const production = producer.productionOver(100);
        expect(production.length).toEqual(0);
    });

    it('should return the correct production value', () => {
        const MINER_PRODUCTION = 0.01;
        const NUMER_OF_MINERS = 5;
        const DELTA = 50;

        producer.buildHarvesters(PrintableType.miner, NUMER_OF_MINERS);

        const production = producer.productionOver(DELTA);
        expect(production.length).toEqual(1);
        expect(production[0]).toEqual({
            type: ResourceType.minerals,
            amount: MINER_PRODUCTION * DELTA * NUMER_OF_MINERS,
        });
    });

    it('should not produce more then the available resources', () => {
        const NUMER_OF_MINERS = 100;
        const DELTA = 1000;

        producer.buildHarvesters(PrintableType.miner, NUMER_OF_MINERS);

        const production = producer.productionOver(DELTA);
        expect(production.length).toEqual(1);
        expect(production[0]).toEqual({
            type: ResourceType.minerals,
            amount: MAX_RESOURCES,
        });
    });
});