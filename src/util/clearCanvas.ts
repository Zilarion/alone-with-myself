interface ClearCanvasProps {
    context: OffscreenCanvasRenderingContext2D;
    left: number;
    top: number;
    width: number;
    height: number;
}

export function clearCanvas({
    context,
    left,
    top,
    width,
    height,
}: ClearCanvasProps) {
    context.save();
    context.fillStyle = 'black';

    context.fillRect(left, top, width, height);
    context.restore();
}
