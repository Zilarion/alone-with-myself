import { Orbit } from '../../drawables/Orbit';
import { drawCircle } from '../drawCircle';

interface DrawOrbitProps {
    context: OffscreenCanvasRenderingContext2D;
    orbit: Orbit;
}

export function drawOrbit({
    context,
    orbit: {
        focus,
        radius,
    },
}: DrawOrbitProps) {
    drawCircle({
        context,
        position: focus.position,
        radius,
        strokeColor: 'rgba(100, 100, 100, 0.4)',
        lineWidth: focus.radius * 0.05,
    });
}
