import { createManufacturer } from './Manufacturer';
import { createResourceStorage } from './ResourceStorage';
import { PrintableType } from './types/PrintableType';
import { ResourceType } from './types/ResourceType';

describe('Manufacturer', () => {
    it('should manufacture correctly', () => {
        const manufacturer = createManufacturer({
            type: PrintableType.manufacturer,
            cost: 0,
            id: 'test',
            duration: 0,
            produces: {
                power: 0,
                mass: 2,
            },
            consumes: [ {
                type: ResourceType.minerals,
                amount: 1,
            } ],
            powerUsage: 1,
            amount: 1,
        });

        const fullStorage = createResourceStorage({
            resources: [ {
                type: ResourceType.minerals,
                amount: 100000,
            } ],
        });

        expect(
            manufacturer.manufactureOver(
                1,
                fullStorage,
                1000,
            )
        ).toEqual({
            consumedPower: 1,
            consumedResources: [ {
                type: ResourceType.minerals,
                amount: 1,
            } ],
            producedMaterials: {
                power: 0,
                mass: 2,
            },
        });
    });

    it('should not manufacture when there is nothing in storage', () => {
        const manufacturer = createManufacturer({
            type: PrintableType.manufacturer,
            cost: 0,
            id: 'test',
            duration: 0,
            produces: {
                power: 1,
                mass: 2,
            },
            consumes: [ {
                type: ResourceType.minerals,
                amount: 1,
            } ],
            powerUsage: 1,
            amount: 1,
        });

        const emptyStorage = createResourceStorage({ resources: [] });
        expect(
            manufacturer.manufactureOver(
                1,
                emptyStorage,
                1000,
            )
        ).toEqual({
            consumedPower: 0,
            consumedResources: [],
            producedMaterials: {
                power: 0,
                mass: 0,
            },
        });

        expect(
            manufacturer.manufactureOver(
                1,
                emptyStorage,
                0,
            )
        ).toEqual({
            consumedPower: 0,
            consumedResources: [],
            producedMaterials: {
                power: 0,
                mass: 0,
            },
        });
    });

    it('should not manufacture when there is not enough power', () => {
        const manufacturer = createManufacturer({
            type: PrintableType.manufacturer,
            cost: 0,
            id: 'test',
            duration: 0,
            produces: {
                power: 1,
                mass: 2,
            },
            consumes: [ {
                type: ResourceType.minerals,
                amount: 1,
            } ],
            powerUsage: 1,
            amount: 1,
        });

        const fullStorage = createResourceStorage({
            resources: [ {
                type: ResourceType.minerals,
                amount: 100000,
            } ],
        });

        expect(
            manufacturer.manufactureOver(
                1,
                fullStorage,
                0,
            )
        ).toEqual({
            consumedPower: 0,
            consumedResources: [],
            producedMaterials: {
                power: 0,
                mass: 0,
            },
        });
    });
});
