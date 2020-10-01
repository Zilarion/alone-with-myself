import {
    action,
    computed,
    observable,
} from 'mobx';

import { Entity } from './Entity';
import {
    InteractionPoint,
    InteractionPointProps,
} from './InteractionPoint';
import { findPrintable } from './Printable';
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
    private _printers: Printers;

    @observable
    private _operational: boolean = false;

    constructor(props: ResourcePointProps) {
        super(props);
        this._producer = new Producer(props.resources);
        this._printers = new Printers();
    }

    @computed
    public get printers() {
        return this._printers;
    }

    @computed
    public get harvesters() {
        return Array.from(this._producer.harvesters.entries())
            .map(([ type, number ]) => ({
                type,
                amount: number,
            }));
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
        this._producer.buildHarvesters(PrintableType.miner, 1);
        this._printers.addPrinters(1);

        this.printers.addPrintOption(PrintableType.printer, new PrintTask({
            complete: (amount: number) => this._printers.addPrinters(amount),
            durationPerItem: findPrintable(PrintableType.printer).duration,
            name: findPrintable(PrintableType.printer).name,
        }));

        this.harvesters.forEach(({ type }) => {
            this.printers.addPrintOption(type, new PrintTask({
                complete: (amount: number) => this._producer.buildHarvesters(type, amount),
                durationPerItem: findPrintable(type).duration,
                name: findPrintable(type).name,
            }));
        });
    }

    public update(delta: number) {
        if (!this.operational) {
            return;
        }

        const production = this._producer.productionOver(delta);
        this.storage.increment(production);
        this._producer.consume(production);
    }

    public get productionPerSecond() {
        return this._producer.productionOver(1000);
    }

    @computed
    public get children(): Entity[] {

        return [
            ... super.children,
            this.printers,
        ];
    }

    private _canPrint(type: PrintableType) {
        return this.storage.has(
            findPrintable(type).cost,
        );
    }

    @computed
    public get availableTasks(): PrintTask[] {
        return this._printers.tasks;
    }
}
