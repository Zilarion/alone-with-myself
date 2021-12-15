import {
    Instance,
    SnapshotIn,
    types,
} from 'mobx-state-tree';
import {
    Harvester,
    ResourceSet,
    ResourceSetModel,
    ResourceStorageModel,
    ResourceType,
} from 'src/internal';

export const ProducerModel = types
    .model('Producer', { consumables: ResourceStorageModel })
    .views(self => ({
        productionOver(
            delta: number,
            harvesters: Harvester[],
        ): ResourceSet {
            const production = new Map<ResourceType, number>();

            harvesters.forEach((harvester) => {
                harvester.totalProduction.forEach(({
                    type,
                    amount,
                }) => {
                    const currentOfResource = production.get(type) ?? 0;
                    const productionForResource = amount * delta;
                    const available = self.consumables.numberOf(type);
                    const additionToResource = Math.min(productionForResource, available);

                    production.set(type, currentOfResource + additionToResource);
                });
            });

            return ResourceSetModel.create(
                Array.from(production.entries()).map(([ type, amount ]) => ({
                    type,
                    amount,
                }))
            );
        },
    }))
    .actions(self => ({
        consume(resources: ResourceSet | SnapshotIn<ResourceSet> = []) {
            self.consumables.decrement(resources);
        },
    }));

export interface Producer extends Instance<typeof ProducerModel> {}
