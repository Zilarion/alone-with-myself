import { Body } from '../models';
import { drawOrbit } from './drawOrbit';

interface DrawBodyProps {
    context: CanvasRenderingContext2D;
    model: Body;
    showOrbit?: boolean;
}

export function drawBody({
    context,
    model: {
        color,
        position,
        orbit,
        radius,
    },
    showOrbit = true,
}: DrawBodyProps) {
    if (showOrbit && orbit) {
        drawOrbit({
            context,
            orbit,
        });
    }

    const {
        x, y,
    } = position;
    context.beginPath();
    context.fillStyle = color;
    context.arc(
        x, y,
        radius,
        0, 2 * Math.PI,
    );
    context.fill();
}
