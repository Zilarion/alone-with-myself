import { ResourceType } from './ResourceType';

export interface Resource {
    type: ResourceType;
    amount: number;
}

export type ResourceSet = Resource[];
