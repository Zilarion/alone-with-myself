import { ManufacturerSnapshot } from '../models/Manufacturer';
import { PrintableType } from '../models/types/PrintableType';
import { ResourceType } from '../models/types/ResourceType';

export const manufacturerSnapshots: ManufacturerSnapshot[] = [
    {
        type: PrintableType.manufacturer,
        id: 'Foundry',
        cost: [
            {
                type: ResourceType.minerals,
                amount: 50,
            },
        ],
        duration: 10,
        produces: [
            {
                type: ResourceType.alloys,
                amount: 0.01,
            },
        ],
        consumes: [
            {
                type: ResourceType.minerals,
                amount: 0.1,
            },
        ],
    },
];
