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

export type HarvesterSchema = {
    produces: ResourceSet;
};

export type HarvesterProps = HarvesterSchema & PrintableProps;

export class Harvester extends Printable {
    @observable
    private _produces: ResourceSet;

    constructor(props: HarvesterProps) {
        super(props);
        this._produces = props.produces;

        makeObservable(this);
    }

    @computed
    get produces() {
        return multiplyResources(this._produces, this.amount);
    }
}
