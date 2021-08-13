import {
    action,
    computed,
    makeObservable,
} from 'mobx';

import {
    Entity,
    EntityType,
    Printers,
} from '../internal';

export class System extends Entity {
    protected _type = EntityType.System;
    private _printers: Printers = new Printers();

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

    @action
    update(_delta: number): void {}
}
