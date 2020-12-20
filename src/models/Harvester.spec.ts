import { findHarvesterSchema } from '../data/Harvesters';
import { findPrintableSchema } from '../data/Printables';
import { multiplyResources } from '../util';
import { EntityType } from './core';
import { Harvester } from './Harvester';
import {
    PrintableType,
    ResourceType,
} from './types';

describe('model: Harvester', () => {
    let miner: Harvester;
    beforeEach(() => {
        miner = new Harvester(
            findHarvesterSchema(PrintableType.miner),
        );
    });

    it('should initialize correctly', () => {
        const {
            name,
            duration,
            cost,
        } = findPrintableSchema(PrintableType.miner);
        expect(miner.printableType).toEqual(PrintableType.miner);
        expect(miner.cost).toEqual(cost);
        expect(miner.duration).toEqual(duration);
        expect(miner.name).toEqual(name);
        expect(miner.children).toEqual([]);
        expect(miner.amount).toEqual(0);
        expect(miner.type).toEqual(EntityType.Printable);
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
        expect(miner.produces).toEqual([ {
            type: ResourceType.minerals,
            amount: 0,
        } ]);
    });

    it('should produce a multiple of the amount based on the amount of miners', () => {
        miner.add(1);

        const production = findHarvesterSchema(PrintableType.miner).produces;
        expect(miner.produces).toEqual(production);

        miner.add(4);

        expect(miner.produces).toEqual(multiplyResources(production, 5));
    });
});
