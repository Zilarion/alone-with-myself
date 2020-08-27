import { Body } from '../models';
import { createSatelliteOf } from './createSatelliteOf';
import { emptyArray } from './emptyArray';
import {
    randomInt,
    randomNumber,
} from './random';

const planetColors = [ 'blue', 'brown', 'green' ];
const moonColors = [ 'grey', 'silver' ];


function randomPlanetColor() {
    return planetColors[randomInt({
        min : 0,
        max: planetColors.length,
    })];
}
function randomMoonColor() {
    return moonColors[randomInt({
        min: 0,
        max: moonColors.length,
    })];
}

interface CreatePlanetProps {
    star: Body;
    numberOfMoons: number;
    orbitRadius: number;
}

export function createPlanet({
    star,
    numberOfMoons,
    orbitRadius,
}: CreatePlanetProps): Body[] {
    const mass = randomNumber(10, star.mass / 100);
    const radius = randomNumber(star.radius / 4, star.radius / 2);

    const planet = createSatelliteOf({
        body: star,
        orbitRadius,
        mass,
        radius,
        color: randomPlanetColor(),
    });

    const hasMoons = Math.random() > 0.6;
    if (!hasMoons) {
        return [ planet ];
    }

    const moons = emptyArray(numberOfMoons).map(() => createSatelliteOf({
        body: planet,
        orbitRadius: randomNumber(planet.radius * 2, planet.radius * 4),
        mass: randomNumber(planet.mass / 20, planet.mass / 10),
        radius: randomNumber(planet.radius / 10, planet.radius / 3),
        color: randomMoonColor(),
    }));
    return [ planet, ...moons ];
}
