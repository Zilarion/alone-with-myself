import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import { findHarvesterSchema } from '../data/Harvesters';
import { assert } from '../util';
import { Harvester } from './Harvester';
import {
    InteractionPoint,
    InteractionPointProps,
} from './InteractionPoint';
import { PrintableType } from './PrintableType';
import { Printers } from './Printers';
import { PrintTask } from './PrintTask';
import { Producer } from './Producer';
import { ResourceSet } from './ResourceSet';

type ResourcePointProps = {
    resources: ResourceSet;
} & InteractionPointProps;

export class ResourcePoint extends InteractionPoint {
    @observable
    private _producer: Producer;

    @observable
    private _operational: boolean = false;

    constructor(props: ResourcePointProps) {
        super(props);
        this.addPrintableOption(new Printers());
        this.addPrintableOption(new Harvester(
            findHarvesterSchema(PrintableType.miner),
        ));
        this._producer = new Producer(props.resources);
        makeObservable(this);
    }

    @computed
    public get printers(): Printers {
        const printers = this.printables.get(PrintableType.printer);
        assert(printers instanceof Printers, 'Failed to find printer in a resource point.');
        return printers;
    }

    @computed
    public get harvesters(): Harvester[] {
        return Array.from(this.printables.values())
            .filter((printable): printable is Harvester => printable instanceof Harvester);
    }

    @computed
    public get resources() {
        return this._producer.consumables;
    }

    @computed
    public get operational() {
        return this._operational;
    }

    @action.bound
    public activate() {
        this._operational = true;

        this.printables.get(PrintableType.miner)?.add(1);
        this.printers.add(1);

        this.printers.addPrintOption(new PrintTask({
            printable: this.printers,
            storage: this.storage,
            complete: (amount: number) => this.printers.add(amount),
        }));

        this.harvesters.forEach((harvester) => {
            this.printers.addPrintOption(new PrintTask({
                printable: harvester,
                storage: this.storage,
                complete: (amount: number) => harvester.add(amount),
            }));
        });
    }

    public update(delta: number) {
        if (!this.operational) {
            return;
        }

        const production = this._producer.productionOver(
            delta,
            this.harvesters,
        );
        this.storage.increment(production);
        this._producer.consume(production);
    }

    @computed
    public get productionPerSecond() {
        return this._producer.productionOver(
            1000,
            this.harvesters,
        );
    }

    @computed
    public get availableTasks(): PrintTask[] {
        return this.printers.tasks;
    }
}
