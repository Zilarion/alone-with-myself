import {
    ManufacturerSnapshot,
    PrintableType,
    ResourceType,
} from 'src/internal';

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
