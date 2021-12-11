import {
    Instance,
    types,
} from 'mobx-state-tree';

import {
    multiplyResources,
    PrintableModel,
} from '../internal';
import { PrintersModel } from './Printers';
import { ProducerModel } from './Producer';

export const SatelliteModel = types
    .model('Satellite', {
        printers: PrintersModel,
        producer: ProducerModel,
        printables: types.array(PrintableModel),
        exploredArea: types.optional(types.number, 0),
        totalArea: types.optional(types.number, 10000),
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
