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
        get totalProduction() {
            return multiplyResources(self.produces, self.amount);
        },
    }));
export interface Harvester extends Instance<typeof HarvesterModel> {}
export interface HarvesterSnapshot extends SnapshotIn<typeof HarvesterModel> {}
