import { SnapshotIn } from 'mobx-state-tree';
import {
    ResourceSet,
    ResourceSetModel,
} from 'src/internal';

export function multiplyResources(
    resources: ResourceSet | SnapshotIn<ResourceSet> = [],
    increment: number
): ResourceSet {
    return ResourceSetModel.create(
        resources.map((resource) => ({
            ... resource,
            amount: resource.amount * increment,
        }))
    );
}
