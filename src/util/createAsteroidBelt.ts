import { Body } from '../models';
import { AsteroidBelt } from '../models/AsteroidBelt';
import { createSatelliteOf } from './createSatelliteOf';
import { emptyArray } from './emptyArray';
import {
    randomNormalDistribution,
    randomNumber,
} from './random';

interface CreateAsteroidBeltProps {
    body: Body;
    width: number;
    numberOfAsteroids: number;
    centerRadius: number;
}

export function createAsteroidBelt({
    body,
    width,
    numberOfAsteroids,
    centerRadius,
}: CreateAsteroidBeltProps): AsteroidBelt {
    const bodies = emptyArray(numberOfAsteroids).map((_, idx) => {
        const orbitRadius = centerRadius + (randomNormalDistribution() - 0.5) * width;

        return createSatelliteOf({
            body,
            orbitRadius,
            radius: randomNumber(10, 40),
            mass: randomNumber(100, 1000),
            color: '#767676',
            id: `A/${idx}`,
            type: 'asteroid',
        });
    });

    return new AsteroidBelt({
        bodies,
        orbitCenter: centerRadius,
        orbitFocus: body,
        width,
    });
}
