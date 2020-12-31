import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    assert,
    InteractionPoint,
    InteractionPointProps,
    Printable,
    PrintableType,
    Printers,
    PrintTask,
} from '../internal';

type PrintablesPointProps = {
    name: string;
} & InteractionPointProps;

export abstract class PrintablesPoint extends InteractionPoint {
    @observable
    private _operational: boolean = false;

    @observable
    private _name: string;

    @observable
    private _printables = new Map<PrintableType, Printable>();

    constructor(props: PrintablesPointProps) {
        super(props);

        this._name = props.name;
        this.addPrintableOption(new Printers());
    }

    @computed
    public get name() {
        return this._name;
    }

    @computed
    public get printables() {
        return this._printables;
    }

    @action.bound
    public addPrintableOption(printable: Printable) {
        this._printables.set(printable.printableType, printable);
        this.printers.addPrintOption(new PrintTask({
            printable,
            storage: this.storage,
        }));
    }

    @computed
    public get printers(): Printers {
        const printers = this.printables.get(PrintableType.printer);
        assert(printers instanceof Printers, 'Failed to find printer in a printables point.');
        return printers;
    }

    @computed
    public get operational() {
        return this._operational;
    }

    @action.bound
    public activate() {
        assert(!this.operational, 'Cannot active a printables point twice.');
        this._operational = true;

        this.printers.add(1);
    }

    @computed
    public get availableTasks(): PrintTask[] {
        if (!this.operational) {
            return [];
        }
        return this.printers.tasks;
    }

    public get children() {
        return [
            ... super.children,
            ... Array.from(this.printables.values()),
        ];
    }
}
