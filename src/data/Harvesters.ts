import { HarvesterSnapshot } from '../models/Harvester';
import { PrintableType } from '../models/types/PrintableType';
import { ResourceType } from '../models/types/ResourceType';

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
