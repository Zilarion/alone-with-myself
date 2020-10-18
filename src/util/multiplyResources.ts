import { ResourceSet } from '../models';

export function multiplyResources(resources: ResourceSet, increment: number) {
    return resources.map((resource) => ({
        ... resource,
        amount: resource.amount * increment,
    }));
}
