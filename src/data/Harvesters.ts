import { HarvesterSnapshot } from '../models/Harvester';
import { PrintableType } from '../models/types/PrintableType';
import { ResourceType } from '../models/types/ResourceType';

export const harvesterSnapshots: HarvesterSnapshot[] = [
    {
        type: PrintableType.harvester,
        id: 'Solar Collector',
        cost: [
            {
                type: ResourceType.minerals,
                amount: 10,
            },
        ],
        amount: 1,
        duration: 5,
        produces: [
            {
                type: ResourceType.power,
                amount: 10,
            },
        ],
    },
];
