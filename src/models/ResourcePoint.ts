import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    findHarvesterSchema,
    Harvester,
    InteractionPointProps,
    PrintablesPoint,
    PrintableType,
    PrintTask,
    Producer,
    ResourceSet,
} from '../internal';

type ResourcePointProps = {
    resources: ResourceSet;
} & InteractionPointProps;

export class ResourcePoint extends PrintablesPoint {
    @observable
    private _producer: Producer;

    constructor(props: ResourcePointProps) {
        super(props);
        this.addPrintableOption(new Harvester(
            findHarvesterSchema(PrintableType.miner),
        ));
        this._producer = new Producer(props.resources);
        makeObservable(this);
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

    @action.bound
    public activate() {
        super.activate();
        this.printables.get(PrintableType.miner)?.add(1);
        this.harvesters.forEach((harvester) => {
            this.printers.addPrintOption(new PrintTask({
                printable: harvester,
                storage: this.storage,
            }));
        });
    }

    @action.bound
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

    public drawUpdate(_delta: number) {}

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
