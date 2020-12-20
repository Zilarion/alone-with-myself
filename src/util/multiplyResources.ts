import { ResourceSet } from '../models/types';

export function multiplyResources(resources: ResourceSet, increment: number) {
    return resources.map((resource) => ({
        ... resource,
        amount: resource.amount * increment,
    }));
}
