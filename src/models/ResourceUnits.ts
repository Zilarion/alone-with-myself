import { ResourceType } from './ResourceType';

export type ResourceUnit = 'kilogram' | 'watt';

export const RESOURCE_TO_UNIT = new Map<ResourceType, ResourceUnit>([
    [ ResourceType.power, 'watt' ],
    [ ResourceType.minerals, 'kilogram' ],
]);
