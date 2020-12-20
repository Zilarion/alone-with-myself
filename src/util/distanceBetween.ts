import { Vector } from '../models/types';

export const distanceBetween = (a: Vector, b: Vector) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
