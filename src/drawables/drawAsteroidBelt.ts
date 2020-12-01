import { FULL_CIRCLE } from '../constants';
import { AsteroidBelt } from '../models/AsteroidBelt';
import { drawCircle } from './drawCircle';
import { drawInteractionPoint } from './drawInteractionPoint';

interface DrawAsteroidBeltProps {
    context: CanvasRenderingContext2D;
    model: AsteroidBelt;
}

export function drawAsteroidBelt({
    context,
    model: {
        mouseOver,
        orbitCenter,
        width,
        orbitFocus,
        selected,
        interactionPoints,
        bodies,
    },
}: DrawAsteroidBeltProps) {
    context.beginPath();
    context.fillStyle = 'grey';

    bodies.forEach(({
        position: {
            x, y,
        }, radius,
    }) => {
        context.moveTo(x, y);
        context.arc(
            x,
            y,
            radius,
            0,
            FULL_CIRCLE,
        );
    });
    context.fill();

    const color = selected ? 'rgba(0, 100, 100, 0.4)' : mouseOver ? 'rgba(100, 100, 100, 0.2)' : 'rgba(100, 100, 100, 0.1)';

    drawCircle({
        context,
        position: orbitFocus.position,
        radius: orbitCenter,
        lineWidth: width,
        strokeColor: color,
    });

    interactionPoints.forEach((point) => {
        if (!selected && !point.selected && !point.operational) {
            return;
        }

        drawInteractionPoint({
            context,
            point,
        });
    });
}
