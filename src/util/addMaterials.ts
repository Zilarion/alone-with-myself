import { Materials } from '../models/types/Materials';

export function addMaterials(
    materialsA: Materials,
    materialsB: Materials,
): Materials {
    return {
        power: materialsA.power + materialsB.power,
        mass: materialsA.mass + materialsB.mass,
    };
}
