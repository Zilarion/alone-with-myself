import { AsteroidBelt } from '../models/AsteroidBelt';
import { drawBody } from './drawBody';

interface DrawAsteroidBeltProps {
    context: CanvasRenderingContext2D;
    model: AsteroidBelt;
}

export function drawAsteroidBelt({
    context,
    model: { bodies },
}: DrawAsteroidBeltProps) {
    bodies.forEach((body) => {
        drawBody({
            context,
            model: body,
            showOrbit: false,
        });
    });
}
