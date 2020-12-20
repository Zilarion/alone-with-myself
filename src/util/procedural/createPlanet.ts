import { Body } from '../../drawables/Body';
import { Planet } from '../../models';
import { emptyArray } from '../emptyArray';
import { createSatelliteOf } from './createSatelliteOf';
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
    id: string;
}

export function createPlanet({
    star,
    numberOfMoons,
    orbitRadius,
    id,
}: CreatePlanetProps): Body[] {
    const mass = randomNumber(star.mass / 10, star.mass / 5);
    const radius = randomNumber(star.radius / 4, star.radius / 2);

    const planet = createSatelliteOf({
        body: star,
        orbitRadius,
        mass,
        radius,
        color: randomPlanetColor(),
        id : `P/${id}`,
        type: 'planet',
    });
    star.addSatellite(planet);

    const hasMoons = Math.random() > 0.6;
    if (!hasMoons) {
        return [ planet ];
    }

    const moons = emptyArray(numberOfMoons).map((_, idx) => createSatelliteOf({
        body: planet,
        orbitRadius: randomNumber(planet.radius * 2, planet.radius * 4),
        mass: randomNumber(planet.mass / 5, planet.mass / 3),
        radius: randomNumber(planet.radius / 10, planet.radius / 3),
        color: randomMoonColor(),
        id: `S/${id} S${idx}`,
        type: 'moon',
    })) as Planet[];
    planet.addSatellite(... moons);
    return [ planet, ...moons ];
}
