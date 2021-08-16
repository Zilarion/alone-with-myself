import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import {
    Entity,
    EntityType,
    Printers,
} from '../internal';

export class System extends Entity {
    @observable
    protected _type = EntityType.System;

    @observable
    private _printers: Printers = new Printers();

    @observable
    private _exploredArea: number = 0;

    @observable
    private _totalArea: number = 10000;

    @observable
    private _metals: number = 0;

    constructor() {
        super();
        makeObservable(this);
    }

    @computed
    get children(): Entity[] {
        return [
            this._printers,
        ];
    }

    @computed
    get exploredArea() {
        return this._exploredArea;
    }

    @computed
    get fullyExplored() {
        return this._exploredArea === this._totalArea;
    }

    @computed
    get totalArea() {
        return this._totalArea;
    }

    @computed
    get metals() {
        return this._metals;
    }

    @computed
    get totalMetals() {
        return this.exploredArea * 10000;
    }

    @action
    update(_delta: number): void {}
}
