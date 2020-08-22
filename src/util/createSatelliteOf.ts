import { Body } from "../models/Body";

const planetColors = ['blue', 'red', 'brown', 'green']

function getRandomInt(max: number) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}

function randomPlanetColor() {
    return planetColors[getRandomInt(4)];
}

export function createSatelliteOf(body: Body) {
    // Take random mass and orbit radius
    const mass = 1;
    const radius = Math.random() * 4 + 3;
    const orbitRadius = Math.random() * 300 + 10;

    // Calculate orbit velocity
    const orbitVelocity = Math.sqrt((body.mass + mass) / orbitRadius);

    // Take a random angle and base satellite position on that angle.
    const angle = Math.random() * Math.PI * 2;
    const position = {
        x: Math.cos(angle) * orbitRadius + body.position.x,
        y: Math.sin(angle) * orbitRadius + body.position.y,
    }

    console.log("New satellite:")
    console.log({ mass, radius, orbitRadius, orbitVelocity, position })
    return new Body({
        position,
        mass,
        radius,
        orbit: {
            angle: 0,
            focus: body.position,
            radius: orbitRadius,
            velocity: orbitVelocity,
        },
        color: randomPlanetColor(),
    })
}
