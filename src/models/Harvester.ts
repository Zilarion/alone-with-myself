import {
    Instance,
    SnapshotIn,
    types,
} from 'mobx-state-tree';
import {
    multiplyResources,
    PrintableModel,
    PrintableType,
    ResourceSetModel,
    ResourceStorage,
    ResourceType,
} from 'src/internal';

export const HarvesterModel = types
    .compose(
        PrintableModel,
        types.model({
            type: types.literal(PrintableType.harvester),
            produces: ResourceSetModel,
        })
    )
    .named('Harvester')
    .views(self => ({
        harvestingOver(
            delta: number,
            availableResources: ResourceStorage,
        ) {
            const production = new Map<ResourceType, number>();

            this.totalProduction.forEach(({
                type,
                amount,
            }) => {
                const currentOfResource = production.get(type) ?? 0;
                const productionForResource = amount * delta;
                const available = availableResources.numberOf(type);
                const additionToResource = Math.min(productionForResource, available);

                if (additionToResource > 0) {
                    production.set(type, currentOfResource + additionToResource);
                }
            });

            return ResourceSetModel.create(
                Array.from(production.entries()).map(([ type, amount ]) => ({
                    type,
                    amount,
                }))
            );
        },
        get totalProduction() {
            return multiplyResources(self.produces, self.amount);
        },
    }));

export interface Harvester extends Instance<typeof HarvesterModel> {}
export interface HarvesterSnapshot extends SnapshotIn<typeof HarvesterModel> {}
