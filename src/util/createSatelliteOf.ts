import { Body } from '../models';

interface CreateSatelliteOfProps {
    body: Body;
    orbitRadius: number;
    color: string;
    mass: number;
    radius: number;
    id: string;
}

export function createSatelliteOf({
    body,
    orbitRadius,
    color,
    mass,
    radius,
    id,
}: CreateSatelliteOfProps) {
    // Calculate orbit velocity
    const orbitVelocity = Math.sqrt((body.mass + mass) / orbitRadius);

    // Take a random angle and base satellite position on that angle.
    const angle = Math.random() * Math.PI * 2;
    const position = {
        x: Math.cos(angle) * orbitRadius + body.position.x,
        y: Math.sin(angle) * orbitRadius + body.position.y,
    };

    return new Body({
        position,
        mass,
        radius,
        orbit: {
            angle,
            focus: body,
            radius: orbitRadius,
            velocity: orbitVelocity,
        },
        color,
        id,
    });
}
