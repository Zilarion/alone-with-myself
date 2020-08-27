import { AsteroidBelt } from '../models/AsteroidBelt';
import { drawBody } from './drawBody';

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
        const {
            x,
            y,
        } = orbitFocus.position;
        context.save();
        context.beginPath();
        context.fillStyle = 'rgba(100, 100, 100, 0.2)';
        context.arc(
            x, y,
            orbitCenter + width / 2,
            0, 2 * Math.PI,
        );
        context.lineWidth = width;
        context.stroke();
        context.restore();
    }

    bodies.forEach((body) => {
        drawBody({
            context,
            model: body,
            showOrbit: false,
        });
    });
}
