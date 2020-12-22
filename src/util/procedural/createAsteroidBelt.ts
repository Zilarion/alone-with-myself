import {
    AsteroidBelt,
    Body,
    createSatelliteOf,
    emptyArray,
    randomNormalDistribution,
    randomNumber,
} from '../../internal';

interface CreateAsteroidBeltProps {
    body: Body;
    width: number;
    numberOfAsteroids: number;
    centerRadius: number;
    id: string;
}

export function createAsteroidBelt({
    body,
    width,
    numberOfAsteroids,
    centerRadius,
    id,
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
    const belt = new AsteroidBelt({
        bodies,
        orbitCenter: centerRadius,
        orbitFocus: body,
        width,
        id: `P/${id}`,
    });
    body.addSatellite(belt);
    return belt;
}
