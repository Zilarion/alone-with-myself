import { Body } from '../models';
import { Entity } from '../models/Entity';
import { createAsteroidBelt } from './createAsteroidBelt';
import { createPlanet } from './createPlanet';
import { emptyArray } from './emptyArray';
import {
    randomInt,
    randomNormalDistribution,
} from './random';

interface CreateSolarSystemProps {
    numberOfPlanets: number;
    maxMoons: number;
    numberOfAsteroidBelts: number;
}

export function createSolarSystem({
    numberOfPlanets,
    maxMoons,
    numberOfAsteroidBelts,
}: CreateSolarSystemProps): Entity[] {
    const radius = 693; // 639e3
    const star = new Body({
        position: {
            x: 0,
            y: 0,
        },
        radius,
        mass: 1989, // 10e30
        color: '#FEB813',
    });

    const radiusIncrements = randomInt({
        min: star.radius * 2,
        max: star.radius * 4,
    });

    const planets = emptyArray(numberOfPlanets).reduce<Entity[]>((entities, _, idx) => {
        const numberOfMoons = Math.floor(randomNormalDistribution(maxMoons));

        return entities.concat(
            createPlanet({
                star,
                numberOfMoons,
                orbitRadius: idx * radiusIncrements,
            }),
        );
    }, []);

    const asteroidBelts = emptyArray(numberOfAsteroidBelts).map((_, idx) => createAsteroidBelt({
        body: star,
        numberOfAsteroids: 500,
        centerRadius: radiusIncrements * (idx + numberOfPlanets),
        width: 3000,
    }));

    return [ star, ... planets, ...asteroidBelts ];
}
