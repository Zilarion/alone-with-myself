import { ManufacturerSnapshot } from '../models/Manufacturer';
import { PrintableType } from '../models/types/PrintableType';
import { ResourceType } from '../models/types/ResourceType';

export const manufacturerSnapshots: ManufacturerSnapshot[] = [
    {
        type: PrintableType.manufacturer,
        id: 'Solar Collector',
        amount: 1,
        duration: 5,
        cost: 10,
        powerUsage: 0,
        consumes: [],
        produces: {
            power: 5,
            mass: 0,
        },
    },
    {
        type: PrintableType.manufacturer,
        id: 'Mining drone',
        duration: 5,
        amount: 1,
        cost: 10,
        powerUsage: 1,
        consumes: [
            {
                type: ResourceType.minerals,
                amount: 1,
            },
        ],
        produces: {
            power: 0,
            mass: 1,
        },
    },
    {
        type: PrintableType.manufacturer,
        id: 'Power infrastructure',
        amount: 0,
        duration: 5,
        cost: 100,
        powerUsage: 0,
        consumes: [],
        produces: {
            power: 20,
            mass: 0,
        },
    },
    {
        type: PrintableType.manufacturer,
        id: 'Drone bay',
        duration: 5,
        amount: 0,
        cost: 100,
        powerUsage: 50,
        consumes: [
            {
                type: ResourceType.minerals,
                amount: 1,
            },
        ],
        produces: {
            power: 0,
            mass: 10,
        },
    },
];
