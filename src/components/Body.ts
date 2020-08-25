import { BodyModel } from '../models';
import { Orbit } from './Orbit';

export function Body(context: CanvasRenderingContext2D, {
    color,
    position,
    orbit,
    radius,
}: BodyModel) {
    if (orbit) {
        Orbit(context, orbit);
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
