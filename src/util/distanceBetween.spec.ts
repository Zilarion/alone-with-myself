import { distanceBetween } from './distanceBetween';

describe('util: distanceBetween', () => {
    const p1 = {
        x: 0,
        y: 0,
    };

    const p2 = {
        x: 10,
        y: 0,
    };

    const p3 = {
        x: 0,
        y: 10,
    };

    it('should calculate the distance correctly', () => {
        expect(distanceBetween(p1, p1)).toEqual(0);
        expect(distanceBetween(p1, p2)).toEqual(10);
        expect(distanceBetween(p1, p3)).toEqual(10);
        expect(distanceBetween(p2, p3)).toEqual(Math.sqrt(10 * 10 + 10 * 10));
    });
});
