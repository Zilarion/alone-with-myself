import { Vector } from '../models';

export const distanceBetween = (a: Vector, b: Vector) => Math.sqrt(a.x ** b.x + a.y ** b.y);
