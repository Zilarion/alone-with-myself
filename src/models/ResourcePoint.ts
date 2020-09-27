import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    InteractionPoint,
    InteractionPointProps,
} from './InteractionPoint';
import { findPrintable } from './Printable';
import { PrintableType } from './PrintableType';
import { Printer } from './Printer';
import { PrintQueue } from './PrintQueue';
import { Producer } from './Producer';
import { ResourceSet } from './ResourceSet';
import { ResourceStorage } from './ResourceStorage';

interface Action {
    onClick: Function;
    enabled: boolean;
    label: string;
    cost: ResourceSet;
}

type ResourcePointProps = {
    resources: ResourceSet;
} & InteractionPointProps;

export class ResourcePoint extends InteractionPoint {
    @observable
    private _producer: Producer;

    @observable
    private _printers: Array<Printer> = new Array();

    @observable
    private _operational: boolean = false;

    @observable
    private _storage: ResourceStorage;

    @observable
    private _queue = new PrintQueue();

    constructor(props: ResourcePointProps) {
        super(props);
        this._producer = new Producer(props.resources);
        this._storage = new ResourceStorage();
    }

    @computed
    public get storage() {
        return this._storage;
    }

    @computed
    public get printers() {
        return this._printers;
    }

    @computed
    public get harvesters() {
        return this._producer.harvesters;
    }

    @computed
    public get resources() {
        return this._producer.consumables;
    }

    @computed
    public get queue() {
        return this._queue;
    }

    @computed
    public get operational() {
        return this._operational;
    }

    @computed
    public get availableActions(): Action[] {
        const harvesterActions: Action[] = this._producer.availableHarvesters.map(([ printableType, harvester ]) => ({
            onClick: () => this._printHarvester(printableType),
            enabled: this._canPrint(printableType),
            label: `Print ${harvester.name}`,
            cost: harvester.cost,
        }));

        return [
            ...harvesterActions,
            {
                onClick: this._printPrinter,
                enabled: this._canPrint(PrintableType.printer),
                label: 'Print Printer',
                cost: findPrintable(PrintableType.printer).cost,
            },
        ];
    }

    @action.bound
    public activate() {
        this._operational = true;
        this._producer.buildHarvester(PrintableType.miner);
        this._printers.push(new Printer(this._queue));
    }

    public update(delta: number) {
        if (!this.operational) {
            return;
        }

        const production = this._producer.productionOver(delta);
        this._storage.increment(production);
        this._producer.consume(production);
    }

    @computed
    public get children() {
        return this.printers;
    }

    private _canPrint(type: PrintableType) {
        return this._storage.has(
            findPrintable(type).cost,
        );
    }

    @action.bound
    private _printHarvester(type: PrintableType) {
        this._print(type, () => {
            this._producer.buildHarvester(type);
        });
    }

    @action.bound
    private _printPrinter() {
        this._print(PrintableType.printer, () => {
            this._printers.push(new Printer(this._queue));
        });
    }

    @action.bound
    private _print(type: PrintableType, complete: () => void) {
        const printable = findPrintable(type);

        if (this._canPrint(type)) {
            const {
                cost,
                duration,
                name,
            } = printable;

            this._queue.enqueue({
                complete,
                duration,
                name,
            });

            this._storage.decrement(cost);
        }
    }
}
