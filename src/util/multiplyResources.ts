import { ResourceSet } from '../models/types/ResourceSet';

export function multiplyResources(
    resources: ResourceSet,
    increment: number
): ResourceSet {
    return (
        resources.map((resource) => ({
            ... resource,
            amount: resource.amount * increment,
        }))
    );
}
