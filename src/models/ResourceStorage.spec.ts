import {
    createResourceStorage,
    ResourceStorage,
} from './ResourceStorage';
import { ResourceType } from './types/ResourceType';

describe('model: ResourceStorage', () => {
    let storage: ResourceStorage;

    const initialResources = [
        {
            type: ResourceType.minerals,
            amount: 100,
        },
        {
            type: ResourceType.power,
            amount: 10,
        },
    ];

    beforeEach(() => {
        storage = createResourceStorage({ resources: initialResources });
    });

    it('should initialize correctly', () => {
        expect(storage.resources).toEqual(initialResources);
        expect(storage.numberOf(ResourceType.minerals)).toEqual(100);
        expect(storage.numberOf(ResourceType.power)).toEqual(10);
    });

    it('should not change resources when incrementing or decrementing an empty array', () => {
        storage.increment([]);

        expect(storage.numberOf(ResourceType.minerals)).toEqual(100);
        expect(storage.numberOf(ResourceType.power)).toEqual(10);

        storage.decrement([]);

        expect(storage.numberOf(ResourceType.minerals)).toEqual(100);
        expect(storage.numberOf(ResourceType.power)).toEqual(10);
    });

    it('should increment single resources correctly', () => {
        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 5,
            },
        ]);

        expect(storage.numberOf(ResourceType.minerals)).toEqual(105);
        expect(storage.numberOf(ResourceType.power)).toEqual(10);
    });

    it('should increment multiple resources correctly', () => {
        storage.increment([
            {
                type: ResourceType.minerals,
                amount: 5,
            },
            {
                type: ResourceType.power,
                amount: 66,
            },
        ]);

        expect(storage.numberOf(ResourceType.minerals)).toEqual(105);
        expect(storage.numberOf(ResourceType.power)).toEqual(76);
    });

    it('should decrement single resources correctly', () => {
        storage.decrement([ {
            type: ResourceType.power,
            amount: 5,
        } ]);

        expect(storage.numberOf(ResourceType.minerals)).toEqual(100);
        expect(storage.numberOf(ResourceType.power)).toEqual(5);
    });

    it('should decrement multiple resources correctly', () => {
        storage.decrement([ {
            type: ResourceType.minerals,
            amount: 50,
        }, {
            type: ResourceType.power,
            amount: 10,
        } ]);

        expect(storage.numberOf(ResourceType.minerals)).toEqual(50);
        expect(storage.numberOf(ResourceType.power)).toEqual(0);
    });

    it('should assert we never decrement below zero', () => {
        expect(() => {
            storage.decrement([ {
                type: ResourceType.minerals,
                amount: 50,
            }, {
                type: ResourceType.power,
                amount: 15,
            } ]);
        }).toThrow();

        expect(() => {
            storage.decrement([ {
                type: ResourceType.power,
                amount: 15,
            } ]);
        }).toThrow();
    });
});
