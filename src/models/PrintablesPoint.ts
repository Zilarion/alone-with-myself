import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    assert,
    InteractionPoint,
    InteractionPointProps,
    PrintableType,
    Printers,
    PrintTask,
} from '../internal';

type PrintablesPointProps = InteractionPointProps;

export abstract class PrintablesPoint extends InteractionPoint {
    @observable
    private _operational: boolean = false;

    constructor(props: PrintablesPointProps) {
        super(props);
        this.addPrintableOption(new Printers());
        makeObservable(this);
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
        assert(this.operational === false, 'Cannot active a printables point twice.');
        this._operational = true;

        this.printers.add(1);
        this.printers.addPrintOption(new PrintTask({
            printable: this.printers,
            storage: this.storage,
        }));
    }
}
