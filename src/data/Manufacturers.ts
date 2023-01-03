import { ManufacturerSnapshot } from '../models/Manufacturer';
import { PrintableType } from '../models/types/PrintableType';
import { ResourceType } from '../models/types/ResourceType';

export const manufacturerSnapshots: ManufacturerSnapshot[] = [
    {
        type: PrintableType.manufacturer,
        id: 'Miner',
        cost: [
            {
                type: ResourceType.minerals,
                amount: 10,
            },
        ],
        duration: 5,
        amount: 1,
        consumes: [
            {
                type: ResourceType.power,
                amount: 1,
            },
        ],
        produces: [
            {
                type: ResourceType.minerals,
                amount: 1,
            },
        ],
    },
];
