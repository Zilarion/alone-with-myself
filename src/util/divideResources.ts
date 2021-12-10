import { ResourceSet } from '../internal';

export function divideResources(numerator: ResourceSet, denominator: ResourceSet) {
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
