import { Body } from '../../drawables/Body';
import { Planet } from '../../models/Planet';

interface CreateSatelliteOfProps {
    body: Body;
    orbitRadius: number;
    color: string;
    mass: number;
    radius: number;
    id: string;
    type: 'asteroid' | 'planet' | 'moon';
}

const typeMap = {
    'asteroid': Body,
    'planet': Planet,
    'moon': Planet,
};

export function createSatelliteOf({
    body,
    orbitRadius,
    mass,
    radius,
    id,
    type,
}: CreateSatelliteOfProps): Body | Planet {
    // Calculate orbit velocity
    const orbitVelocity = Math.sqrt((body.mass + mass) / orbitRadius);

    // Take a random angle and base satellite position on that angle.
    const angle = Math.random() * Math.PI * 2;
    const position = {
        x: Math.cos(angle) * orbitRadius + body.position.x,
        y: Math.sin(angle) * orbitRadius + body.position.y,
    };


    const obj = typeMap[type];
    return new obj({
        position,
        mass,
        radius,
        orbit: {
            angle,
            focus: body,
            radius: orbitRadius,
            velocity: orbitVelocity,
        },
        id,
    });
}
