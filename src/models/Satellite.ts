import { createStore } from 'solid-js/store';

import { assertDefined } from '../util/assertDefined';
import { Harvester } from './Harvester';
import { Manufacturer } from './Manufacturer';
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

    const [ store, setStore ] = createStore({
        totalArea,
        exploredArea,
        name,
        printables: printableInstances,
        storage: createResourceStorage(storage),
        totalSatelliteResources: createResourceStorage(totalSatelliteResources),
        printers,
        scanStatus: {
            scanning: false,
            progress: 0,
        },
        startScan() {
            setStore('scanStatus', 'scanning', true);
        },
        get fullyExplored() {
            return this.exploredArea === this.totalArea;
        },
        get harvesters(): Harvester[] {
            return this.printables.filter((printable): printable is Harvester =>
                printable.type === PrintableType.harvester
            );
        },
        get manufacters(): Manufacturer[] {
            return this.printables.filter((printable): printable is Manufacturer =>
                printable.type === PrintableType.manufacturer
            );
        },
        update(delta: number) {
            store.printers.update(delta);
            updateHarvesters(delta);
            updateManufacturers(delta);
            updateScanner(delta);
        },
    });

    function updateHarvesters(delta: number) {
        store.harvesters.forEach(harvester => {
            const harvestedResources = harvester.harvestingOver(
                delta,
                store.totalSatelliteResources
            );

            store.totalSatelliteResources.decrement(harvestedResources);
            store.storage.increment(harvestedResources);
        });
    }

    function updateManufacturers(delta: number) {
        store.manufacters.forEach(manufacturer => {
            const {
                consumedResources,
                producedResources,
            } = manufacturer.manufactureOver(
                delta,
                store.storage
            );

            store.storage.decrement(consumedResources);
            store.storage.increment(producedResources);
        });
    }

    function updateScanner(delta: number) {
        if (store.scanStatus.scanning) {
            const progress = store.scanStatus.progress + delta;

            if (progress > 10000) {
                setStore('scanStatus', 'scanning', false);
                setStore('scanStatus', 'progress', 0);
                setStore('exploredArea', store.exploredArea + 1000);
            } else {
                setStore('scanStatus', 'progress', progress);
            }
        }
    }

    return store;
}
