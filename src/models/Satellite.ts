import {
    Instance,
    types,
} from 'mobx-state-tree';
import {
    multiplyResources,
    PrintersModel,
} from 'src/internal';

import { PrintableUnion } from './PrintableUnion';
import { ProducerModel } from './Producer';
import { ResourceStorageModel } from './ResourceStorage';

export const SatelliteModel = types
    .model('Satellite', {
        printers: PrintersModel,
        producer: ProducerModel,
        storage: ResourceStorageModel,
        printables: types.array(PrintableUnion),
        exploredArea: types.optional(types.number, 0),
        totalArea: types.optional(types.number, 10000),
        name: types.identifier,
    })
    .views(self => ({
        get fullyExplored() {
            return self.exploredArea === self.totalArea;
        },
        get resources() {
            const percentExplored = self.exploredArea / self.totalArea;
            return multiplyResources(
                self.producer.consumables.resources,
                percentExplored
            );
        },
    }))
    .actions(self => ({
        update(delta: number) {
            self.printers.update(delta);
        },
    }));
export interface Satellite extends Instance<typeof SatelliteModel> {}
