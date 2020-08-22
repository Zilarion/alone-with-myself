import { Body } from "../models/Body";
import { randomNumber } from "./random";


export function createSatelliteOf(body: Body, maxOrbit: number, color: string) {
    // Take random mass and orbit radius
    const mass = randomNumber(10, body.mass / 10);
    const radius = randomNumber(1, body.radius / 2);
    const orbitRadius = randomNumber(body.radius * 1.2, body.radius * maxOrbit);

    // Calculate orbit velocity
    const orbitVelocity = Math.sqrt((body.mass + mass) / orbitRadius);

    // Take a random angle and base satellite position on that angle.
    const angle = Math.random() * Math.PI * 2;
    const position = {
        x: Math.cos(angle) * orbitRadius + body.position.x,
        y: Math.sin(angle) * orbitRadius + body.position.y,
    }

    return new Body({
        position,
        mass,
        radius,
        orbit: {
            angle: 0,
            focus: body,
            radius: orbitRadius,
            velocity: orbitVelocity,
        },
        color,
    })
}
