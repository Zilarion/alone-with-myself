import { ResourceType } from './ResourceType';

export type ResourceRequirement = {
    type: ResourceType;
    amount: number;
}[];
