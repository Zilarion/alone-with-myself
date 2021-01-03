import {
    action,
    computed,
    makeObservable,
} from 'mobx';

import {
    findManufacturerSchema,
    InteractionPointProps,
    Manufacturer,
    PrintablesPoint,
    PrintableType,
} from '../internal';
import { divideResources } from '../util/divideResources';
import { multiplyResources } from '../util/multiplyResources';

type ManufacturerPointProps = InteractionPointProps;

export class ManufacturerPoint extends PrintablesPoint {
    constructor(props: ManufacturerPointProps) {
        super({
            ...props,
            name: 'Manufacturing',
        });
        this.addPrintableOption(new Manufacturer(
            findManufacturerSchema(PrintableType.foundry),
        ));
        makeObservable(this);
    }

    @computed
    public get manufacturers(): Manufacturer[] {
        return Array.from(this.printables.values())
            .filter((printable): printable is Manufacturer => printable instanceof Manufacturer);
    }

    @action.bound
    public update(delta: number) {
        if (!this.operational) {
            return;
        }

        this._produceOver(delta);
    }

    private _produceOver(
        delta: number,
    ) {
        this.manufacturers.forEach(({
            consumes,
            produces,
            amount,
        }) => {
            if (amount === 0) {
                return;
            }

            const maximumConsumption = multiplyResources(consumes, delta);
            const multipleConsumed = divideResources(maximumConsumption, this.storage.resources);
            const actualConsumption = multiplyResources(consumes, multipleConsumed);
            const actualProduction = multiplyResources(produces, multipleConsumed);

            this.storage.decrement(actualConsumption);
            this.storage.increment(actualProduction);
        });
    }

    @computed
    public get productionPerSecond() {
        return []; // TODO
    }
}
