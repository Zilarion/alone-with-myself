import { Orbit } from '../models';

interface DrawOrbitProps {
    context: CanvasRenderingContext2D;
    orbit: Orbit;
}

export function drawOrbit({
    context,
    orbit: {
        focus,
        radius,
    },
}: DrawOrbitProps) {
    context.beginPath();
    context.strokeStyle = 'rgba(100, 100, 100, 0.8)';
    context.lineWidth = 10;

    context.arc(
        focus.position.x, focus.position.y,
        radius,
        0, 2 * Math.PI,
    );
    context.stroke();
}
