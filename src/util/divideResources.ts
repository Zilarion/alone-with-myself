import { SnapshotIn } from 'mobx-state-tree';
import { ResourceSet } from 'src/internal';

export function divideResources(
    numerator: ResourceSet | SnapshotIn<ResourceSet> = [],
    denominator: ResourceSet | SnapshotIn<ResourceSet> = []
) {
    if (denominator.length === 0) {
        return 0;
    }

    let maxDivision = Number.MAX_SAFE_INTEGER;
    let hasAllResources = true;
    numerator.forEach(({
        type, amount,
    }) => {
        const foundResource = denominator.find((resource) => resource.type === type);
        if (foundResource == null) {
            hasAllResources = false;
            return;
        }

        maxDivision = Math.min(maxDivision, foundResource.amount / amount);
    });
    return hasAllResources ? maxDivision : 0;
}
