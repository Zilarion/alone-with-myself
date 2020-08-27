import { Vector } from './Vector';

export abstract class Entity {
    public abstract update(delta: number): void;

    public abstract pointIsInside(point: Vector): boolean;
}
