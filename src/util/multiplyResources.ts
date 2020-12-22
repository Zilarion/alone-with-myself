import { ResourceSet } from '../models/types';

export function multiplyResources(resources: ResourceSet, increment: number): ResourceSet {
    return resources.map((resource) => ({
        ... resource,
        amount: resource.amount * increment,
    }));
}
