import { Materials } from '../models/types/Materials';

export function multiplyMaterials(
    materials: Materials,
    increment: number
): Materials {
    return {
        power: materials.power * increment,
        mass: materials.mass * increment,
    };
}
