import {
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    multiplyResources,
    Printable,
    PrintableProps,
    ResourceSet,
} from '../internal';

export type ManufacturerSchema = {
    produces: ResourceSet;
    consumes: ResourceSet;
};

export type ManufacturerProps = ManufacturerSchema & PrintableProps;

export class Manufacturer extends Printable {
    @observable
    private _produces: ResourceSet;

    @observable
    private _consumes: ResourceSet;

    constructor(props: ManufacturerProps) {
        super(props);
        this._produces = props.produces;
        this._consumes = props.consumes;

        makeObservable(this);
    }

    @computed
    public get produces() {
        return multiplyResources(this._produces, this.amount);
    }

    @computed
    public get consumes() {
        return multiplyResources(this._consumes, this.amount);
    }
}
