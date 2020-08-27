import { Vector } from './Vector';

export abstract class Entity {
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

    public abstract update(delta: number): void;
    public abstract pointIsInside(point: Vector): boolean;
}
