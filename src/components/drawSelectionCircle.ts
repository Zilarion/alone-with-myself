import { Vector } from '../models';

interface DrawSelectionCircleProps {
    radius: number;
    center: Vector;
    context: CanvasRenderingContext2D;
}

const SELECTION_COLOR = '#019EBC';
const SELECTION_WIDTH = 0.3;
const SELECTION_DISTANCE = 1.6;

export function drawSelectionCircle({
    context,
    radius,
    center,
}: DrawSelectionCircleProps) {
    context.save();

    const {
        x,
        y,
    } = center;

    context.strokeStyle = SELECTION_COLOR;
    context.lineWidth = radius * SELECTION_WIDTH;

    const angleStart = Date.now() / 1000 % Math.PI * 2;

    context.beginPath();
    context.arc(
        x, y,
        radius * SELECTION_DISTANCE,
        angleStart, angleStart + Math.PI / 2,
    );
    context.stroke();

    context.beginPath();
    context.arc(
        x, y,
        radius * SELECTION_DISTANCE,
        angleStart + Math.PI, angleStart +Math.PI * 1.5,
    );

    context.stroke();

    context.restore();
}
