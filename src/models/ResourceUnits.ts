import { ResourceType } from '../internal';

export type ResourceUnit = 'kilogram' | 'watt';

export const RESOURCE_TO_UNIT = new Map<ResourceType, ResourceUnit>([
    [ ResourceType.power, 'watt' ],
    [ ResourceType.minerals, 'kilogram' ],
    [ ResourceType.alloys, 'kilogram' ],
]);
