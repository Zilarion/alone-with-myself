import {
    ResourceSet,
    ResourceStorage,
} from 'src/internal';

export function resourcesInStorage({ numberOf }: ResourceStorage, cost: ResourceSet) {
    return cost.reduce((minimum, {
        type, amount,
    }) => {
        const numberOnlyThisResource = numberOf(type) / amount;
        return Math.min(minimum, numberOnlyThisResource);
    }, Infinity);
}
