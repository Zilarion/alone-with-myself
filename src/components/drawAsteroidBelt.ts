import { FULL_CIRCLE } from '../constants';
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
            radius: orbitCenter,
            lineWidth: width,
            strokeColor: 'rgba(100, 100, 100, 0.2)',
        });
    }

    context.beginPath();
    context.fillStyle = 'grey';

    bodies.forEach(({
        position: {
            x, y,
        }, radius,
    }) => {
        context.moveTo(x, y);
        context.arc(
            x, y,
            radius,
            0, FULL_CIRCLE,
        );
    });
    context.fill();
}
