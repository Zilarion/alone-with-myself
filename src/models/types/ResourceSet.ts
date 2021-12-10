import { ResourceType } from '../../internal';

export type ResourceSet = Array<{
    type: ResourceType;
    amount: number;
}>;
