import { InteractionPoint } from './InteractionPoint';

interface DrawMarkerProps {
    context: OffscreenCanvasRenderingContext2D;
    point: InteractionPoint;
    color: string;
}
export function drawMarker({
    context,
    point: {
        position: {
            x,
            y,
        },
        size,
    },
    color,
}: DrawMarkerProps) {
    context.save();
    context.fillStyle = color;
    context.strokeStyle = color;

    const margin = size / 8;
    const halfSize = size / 2;

    context.translate(x, y);
    context.rotate(Math.PI / 4);

    context.lineWidth = margin / 3;
    context.fillRect(
        - halfSize + margin,
        - halfSize + margin,
        size - margin * 2,
        size - margin * 2,
    );
    context.strokeRect(
        - halfSize,
        - halfSize,
        size,
        size,
    );


    context.restore();
}
