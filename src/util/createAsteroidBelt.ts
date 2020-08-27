import { Body } from '../models';
import { AsteroidBelt } from '../models/AsteroidBelt';
import { emptyArray } from './emptyArray';

export function createAsteroidBelt(body: Body): AsteroidBelt {
    const count = Math.round(Math.random() * 300 + 200);
    const asteroidOrbitCenter = Math.random() * 10000 + 4000;

    const bodies = emptyArray(count).map(() => {
        return new Body({
            position: {
                x: 0,
                y: 0,
            },
            orbit: {
                angle: Math.random() * Math.PI * 2 ,
                focus: body,
                radius: asteroidOrbitCenter + Math.random() * 400,
                velocity: 0.05 + Math.random() * 0.02,
            },
            radius: Math.random() * 20, // 639e3
            mass: 1989, // 10e30
            color: '#767676',
        });
    });

    return new AsteroidBelt(bodies);
}
