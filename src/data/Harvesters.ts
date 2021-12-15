import {
    HarvesterSnapshot,
    PrintableType,
    ResourceType,
} from 'src/internal';

export const harvesterSnapshots: HarvesterSnapshot[] = [
    {
        type: PrintableType.harvester,
        id: 'Miner',
        cost: [
            {
                type: ResourceType.minerals,
                amount: 10,
            },
        ],
        duration: 5,
        produces: [
            {
                type: ResourceType.minerals,
                amount: 0.001,
            },
        ],
    },
];
