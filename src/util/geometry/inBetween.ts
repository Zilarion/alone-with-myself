import { Vector } from '../../internal';

export function inBetween(a: Vector, b: Vector): Vector {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    };
}
