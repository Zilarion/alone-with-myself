import {
    Instance,
    types,
} from 'mobx-state-tree';

import { Harvester } from './Harvester';
import { PrintableUnion } from './PrintableUnion';
import { PrintersModel } from './Printers';
import { ResourceStorageModel } from './ResourceStorage';
import { PrintableType } from './types/PrintableType';

export const SatelliteModel = types
    .model('Satellite', {
        printers: PrintersModel,
        totalSatelliteResources: ResourceStorageModel,
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
        get harvesters(): Harvester[] {
            return self.printables.filter((printable): printable is Harvester =>
                printable.type === PrintableType.harvester
            );
        },
    }))
    .actions(self => ({
        updateHarvesters(delta: number) {
            self.harvesters.forEach(harvester => {
                const harvestedResources = harvester.harvestingOver(
                    delta,
                    self.totalSatelliteResources
                );

                self.totalSatelliteResources.decrement(harvestedResources);
                self.storage.increment(harvestedResources);
            });
        },
        update(delta: number) {
            self.printers.update(delta);
            this.updateHarvesters(delta);
        },
    }));
export interface Satellite extends Instance<typeof SatelliteModel> {}
