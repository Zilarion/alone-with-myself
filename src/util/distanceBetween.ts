import { Vector } from '../internal';

export const distanceBetween = (a: Vector, b: Vector) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
