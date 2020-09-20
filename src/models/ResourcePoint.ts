import {
    action,
    computed,
    observable,
} from 'mobx';

import {
    InteractionPoint,
    InteractionPointProps,
} from './InteractionPoint';

type ResourcePointProps = {
    resources: number;
} & InteractionPointProps;

export class ResourcePoint extends InteractionPoint {
    @observable
    private _resources: number;

    @observable
    private _printers: number = 0;

    @observable
    private _miners: number = 0;

    @observable
    private _operational: boolean = false;

    constructor(props: ResourcePointProps) {
        super(props);
        this._resources = props.resources;
    }

    @computed
    public get printers() {
        return this._printers;
    }

    @computed
    public get miners() {
        return this._miners;
    }

    @computed
    public get resources() {
        return this._resources;
    }

    @computed
    public get operational() {
        return this._operational;
    }

    @action.bound
    public activate() {
        this._operational = true;
        this._miners = 1;
        this._printers = 1;
    }
}
