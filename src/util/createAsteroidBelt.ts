import { BodyModel } from '../models';
import { emptyArray } from './emptyArray';

export function createAsteroidBelt(body: BodyModel) {
    const count = 500;

    return emptyArray(count).map(() => {
        return new BodyModel({
            position: {
                x: 0,
                y: 0,
            },
            orbit: {
                angle: Math.random() * Math.PI * 2 ,
                focus: body,
                radius: 8000 + Math.random() * 400,
                velocity: 0.05 + Math.random() * 0.02,
            },
            radius: Math.random() * 20, // 639e3
            mass: 1989, // 10e30
            color: '#767676',
        });
    });
}
