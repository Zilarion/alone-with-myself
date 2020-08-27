import { AsteroidBelt } from '../models/AsteroidBelt';
import { drawBody } from './drawBody';
import { drawCircle } from './drawCircle';

interface DrawAsteroidBeltProps {
    context: CanvasRenderingContext2D;
    model: AsteroidBelt;
}

export function drawAsteroidBelt({
    context,
    model: {
        bodies,
        mouseOver,
        orbitCenter,
        width,
        orbitFocus,
    },
}: DrawAsteroidBeltProps) {
    if (mouseOver) {
        drawCircle({
            context,
            position: orbitFocus.position,
            radius: orbitCenter + width / 2,
            lineWidth: width,
            strokeColor: 'rgba(100, 100, 100, 0.2)',
        });
    }

    bodies.forEach((body) => {
        drawBody({
            context,
            model: body,
            showOrbit: false,
        });
    });
}
