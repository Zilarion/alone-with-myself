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

    const generationOrder: ('planet' | 'asteroid')[] = emptyArray(numberOfPlanets)
        .fill('planet')
        .concat(
            emptyArray(numberOfAsteroidBelts)
                .fill('asteroid'),
        );
    generationOrder.sort(() => Math.random() - 0.5);

    const entities = generationOrder.reduce<Entity[]>((entities, type, idx) => {
        const radius = (1 + idx) * radiusIncrements;
        if (type === 'planet') {
            const numberOfMoons = Math.floor(randomNormalDistribution(maxMoons));

            return entities.concat(
                createPlanet({
                    star,
                    numberOfMoons,
                    orbitRadius: radius,
                }),
            );
        } else {
            return entities.concat(createAsteroidBelt({
                body: star,
                numberOfAsteroids: Math.floor(radius / 10),
                centerRadius: radius,
                width: radiusIncrements,
            }));
        }
    }, []);

    return [ star,... entities ];
}