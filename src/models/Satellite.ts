import { createStore } from 'solid-js/store';

import { assertDefined } from '../util/assertDefined';
import { Harvester } from './Harvester';
import {
    createPrintableInstance,
    PrintableInstance,
    PrintableSnapshot,
} from './PrintableUnion';
import { Printer } from './Printer';
import { createPrinters } from './Printers';
import { PrintTaskSnapshot } from './PrintTask';
import {
    createResourceStorage,
    ResourceStorageSnapshot,
} from './ResourceStorage';
import { PrintableType } from './types/PrintableType';

interface SatelliteSnapshot {
    printTasks?: PrintTaskSnapshot[];
    storage: ResourceStorageSnapshot;
    totalSatelliteResources: ResourceStorageSnapshot;
    printables: PrintableSnapshot[];
    name: string;
    totalArea?: number;
    exploredArea?: number;
}

export interface Satellite extends ReturnType<typeof createSatellite> {}

export function createSatellite({
    name,
    printTasks = [],
    totalArea = 1000,
    exploredArea = 0,
    printables,
    storage,
    totalSatelliteResources,
}: SatelliteSnapshot) {
    function updateHarvesters(state: typeof store, delta: number) {
        store.harvesters.forEach(harvester => {
            const harvestedResources = harvester.harvestingOver(
                delta,
                state.totalSatelliteResources
            );

            state.totalSatelliteResources.decrement(harvestedResources);
            state.storage.increment(harvestedResources);
        });
    }

    const printableInstances = printables.map(createPrintableInstance);

    const printer = assertDefined(
        printableInstances.find((p: PrintableInstance): p is Printer =>
            p.type === PrintableType.printer
        )
    );

    const printers = createPrinters({
        printers: printer,
        tasks: printTasks,
    });

    const [ store ] = createStore({
        totalArea,
        exploredArea,
        name,
        printables: printableInstances,
        storage: createResourceStorage(storage),
        totalSatelliteResources: createResourceStorage(totalSatelliteResources),
        printers,

        get fullyExplored() {
            return this.exploredArea === this.totalArea;
        },
        get harvesters(): Harvester[] {
            return this.printables.filter((printable): printable is Harvester =>
                printable.type === PrintableType.harvester
            );
        },
        update(delta: number) {
            store.printers.update(delta);
            updateHarvesters(store, delta);
        },
    });

    return store;
}
