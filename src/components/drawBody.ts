
import { TinyColor } from '@ctrl/tinycolor';

import { Body } from '../models';
import { drawCircle } from './drawCircle';
import { drawMarker } from './drawMarker';
import { drawOrbit } from './drawOrbit';

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
        selected,
        points,
    },
    showOrbit = true,
}: DrawBodyProps) {
    if (showOrbit && orbit) {
        drawOrbit({
            context,
            orbit,
        });
    }

    points.forEach((point) => {
        if (!point.selected && !selected) {
            return;
        }

        const color = point.mouseOver || point.selected
            ? 'rgb(0, 255, 255)'
            : 'rgb(0, 180, 180)';

        drawMarker({
            context,
            point,
            color,
        });
    });

    const fillColor = mouseOver ?
        new TinyColor(color).lighten(20).toHexString() :
        color;

    drawCircle({
        context,
        position,
        fillColor,
        radius,
    });
}
