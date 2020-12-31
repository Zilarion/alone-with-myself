import { drawCircle } from '../drawCircle';
import { drawInteractionPoint } from '../InteractionPoint/drawInteractionPoint';
import { drawOrbit } from '../Orbit';
import { Body } from './Body';

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
        mouseOver,
        points,
        selected,
    },
    showOrbit = true,
}: DrawBodyProps) {
    if (showOrbit && orbit) {
        drawOrbit({
            context,
            orbit,
        });
    }

    const strokeColor = mouseOver || selected ?
        'rgb(0, 255, 255)' :
        color;

    drawCircle({
        context,
        position,
        fillColor: '#111',
        strokeColor: strokeColor,
        radius,
        lineWidth: radius * 0.1,
    });

    points.forEach((point) => {
        drawInteractionPoint({
            context,
            point,
        });
    });
}
