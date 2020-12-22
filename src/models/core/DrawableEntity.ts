import {
    Entity,
    Vector,
} from '../../internal';

export abstract class DrawableEntity extends Entity {
    private _selected: boolean = false;
    private _mouseOver: boolean = false;

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
    }

    public get mouseOver() {
        return this._mouseOver;
    }

    public set mouseOver(value: boolean) {
        this._mouseOver = value;
    }

    public abstract pointIsInside(point: Vector): boolean;
}
