import { Transporter } from '../models';

interface DrawTransporterProps {
    context: CanvasRenderingContext2D;
    transporter: Transporter;
}

export function drawTransporter({
    context,
    transporter: {
        from,
        to,
    },
}: DrawTransporterProps) {
    context.save();
    const color = 'rgb(0, 180, 180)';

    context.strokeStyle = color;

    context.lineWidth = 40;
    context.beginPath();
    context.setLineDash([ 100, 100 ]);
    context.lineDashOffset = - Math.round(performance.now() / 5 % 1000);
    context.moveTo(from.location.x, from.location.y);
    context.lineTo(to.location.x, to.location.y);
    context.stroke();

    context.restore();
}
