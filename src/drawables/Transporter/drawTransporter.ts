import { Transporter } from './Transporter';

interface DrawTransporterProps {
    context: OffscreenCanvasRenderingContext2D;
    transporter: Transporter;
}

export function drawTransporter({
    context,
    transporter: {
        from,
        to,
        mouseOver,
        selected,
    },
}: DrawTransporterProps) {
    context.save();
    const color = 'rgb(0, 180, 180)';

    context.strokeStyle = color;

    context.lineWidth = 40;
    context.beginPath();
    context.setLineDash([ 100, 100 ]);
    context.lineDashOffset = - Math.round(performance.now() / 5 % 1000);
    context.moveTo(from.position.x, from.position.y);
    context.lineTo(to.position.x, to.position.y);
    context.stroke();

    context.restore();

    context.save();
    if (mouseOver || selected) {
        context.lineWidth = 200;
        context.beginPath();
        context.moveTo(from.position.x, from.position.y);
        context.lineTo(to.position.x, to.position.y);
        context.strokeStyle = selected ? 'rgba(0, 180, 180, 0.4)' : 'rgba(100, 100, 100, 0.2)';
        context.stroke();
    }
    context.restore();

}
