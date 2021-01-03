import { drawMarker } from '../drawMarker';
import { drawTransporter } from '../Transporter/drawTransporter';
import { InteractionPoint } from './InteractionPoint';

interface DrawInteractionPoint {
    context: OffscreenCanvasRenderingContext2D;
    point: InteractionPoint;
}

export function drawInteractionPoint({
    context,
    point,
}: DrawInteractionPoint) {
    const color = point.mouseOver || point.selected
        ? 'rgb(0, 255, 255)'
        : 'rgb(0, 180, 180)';

    point.outgoing.forEach((transporter) => {
        drawTransporter({
            context,
            transporter,
        });
    });

    drawMarker({
        context,
        point,
        color,
    });
}
