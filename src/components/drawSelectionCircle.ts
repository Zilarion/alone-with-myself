import { FULL_CIRCLE } from '../constants';
import { Vector } from '../models';

interface DrawSelectionCircleProps {
    radius: number;
    center: Vector;
    context: CanvasRenderingContext2D;
}

const SELECTION_COLOR = 'cyan';
const SELECTION_WIDTH = 0.1;
const SELECTION_DISTANCE = 1.4;

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
    context.beginPath();
    context.strokeStyle = SELECTION_COLOR;
    context.lineWidth = radius * SELECTION_WIDTH;
    context.arc(
        x, y,
        radius * SELECTION_DISTANCE,
        0, FULL_CIRCLE,
    );
    context.stroke();

    context.restore();
}
