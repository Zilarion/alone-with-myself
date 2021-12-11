import {
    HarvesterSnapshot,
    PrintableType,
    ResourceType,
} from '../internal';

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
                amount: 0.01,
            },
        ],
    },
];
