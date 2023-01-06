import { addMaterials } from './addMaterials';

describe('addMaterials', () => {
    it('should add the power and mass of two materials', () => {
        const materialsA = {
            power: 1,
            mass: 2,
        };
        const materialsB = {
            power: 3,
            mass: 4,
        };
        const result = addMaterials(materialsA, materialsB);
        expect(result).toEqual({
            power: 4,
            mass: 6,
        });
    });
});
