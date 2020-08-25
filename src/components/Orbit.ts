import { Orbit } from '../models';

export function Orbit(context: CanvasRenderingContext2D, {
    radius,
    focus,
}: Orbit) {
    context.beginPath();
    context.strokeStyle = 'rgba(100, 100, 100, 0.4)';

    context.arc(
        focus.position.x, focus.position.y,
        radius,
        0, 2 * Math.PI,
    );
    context.stroke();
}
