import { createStore } from 'solid-js/store';

import { addMaterials } from '../util/addMaterials';
import { assert } from '../util/assert';
import { assertDefined } from '../util/assertDefined';
import { multiplyMaterials } from '../util/multiplyMaterials';
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
import { Materials } from './types/Materials';
import { PrintableType } from './types/PrintableType';

interface SatelliteSnapshot {
    printTasks?: PrintTaskSnapshot[];
    materials: Materials;
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
    materials,
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
        materials,
        printables: printableInstances,
        totalSatelliteResources: createResourceStorage(totalSatelliteResources),
        printers,
        estimatedProduction: {
            power: 0,
            mass: 0,
        },
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
        get manufacters(): Manufacturer[] {
            return this.printables.filter((printable): printable is Manufacturer =>
                printable.type === PrintableType.manufacturer
            );
        },
        update(delta: number) {
            const manufacturerMaterialChanges = updateManufacturers(delta);
            const printerMaterialChanges = updatePrinters(delta);

            const totalMaterialChanges = addMaterials(
                manufacturerMaterialChanges,
                printerMaterialChanges
            );

            const estimatedProduction = multiplyMaterials(
                totalMaterialChanges,
                1 / delta
            );

            setStore('estimatedProduction', estimatedProduction);
            updateScanner(delta);
        },
        spentMass(amount: number) {
            const newMassValue = store.materials.mass - amount;
            assert(newMassValue >= 0, 'Not enough mass to use');
            setStore('materials', 'mass', newMassValue);
        },
        spentPower(amount: number) {
            if (amount <= 0) {
                return;
            }
            const newPowerValue = this.materials.power - amount;
            assert(newPowerValue >= 0, 'Not enough power to use');
            setStore('materials', 'power', newPowerValue);
        },
        addMaterials(increment: Materials) {
            setStore('materials', 'power', this.materials.power + increment.power);
            setStore('materials', 'mass', this.materials.mass + increment.mass);
        },
    });

    function updatePrinters(delta: number) {
        const { consumedPower } = store.printers.update(
            delta,
            store.materials.power
        );

        store.spentPower(consumedPower);

        return {
            power: -consumedPower,
            mass: 0,
        };
    }

    function updateManufacturers(delta: number) {
        let combinedProduction = {
            mass: 0,
            power: 0,
        };

        store.manufacters.forEach(manufacturer => {
            const {
                consumedResources,
                producedMaterials,
                consumedPower,
            } = manufacturer.manufactureOver(
                delta,
                store.totalSatelliteResources,
                store.materials.power,
            );

            store.totalSatelliteResources.decrement(consumedResources);

            combinedProduction = addMaterials(
                combinedProduction,
                producedMaterials
            );
            combinedProduction = addMaterials(
                combinedProduction,
                {
                    power: -consumedPower,
                    mass: 0,
                }
            );
            store.addMaterials(producedMaterials);
            store.spentPower(consumedPower);
        });

        return combinedProduction;
    }

    function updateScanner(delta: number) {
        if (store.scanStatus.scanning) {
            const progress = store.scanStatus.progress + delta * 10;

            if (progress > 100) {
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
