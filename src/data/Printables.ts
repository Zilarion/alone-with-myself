import { ResourceRequirement } from '../models';
import { ResourceType } from '../models/ResourceType';

interface Printable {
    resources: ResourceRequirement;
    duration: number;
}

export const PRINTABLES: { [key: string]: Printable } = {
    miner: {
        resources: [ {
            type: ResourceType.minerals,
            amount: 10,
        } ],
        duration: 1000,
    },
    printer: {
        resources: [ {
            type: ResourceType.minerals,
            amount: 100,
        } ],
        duration: 2000,
    },
};
