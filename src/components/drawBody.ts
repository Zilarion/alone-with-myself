
import { TinyColor } from '@ctrl/tinycolor';

import { Body } from '../models';
import { drawCircle } from './drawCircle';
import { drawInteractionPoint } from './drawInteractionPoint';
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
        drawInteractionPoint({
            context,
            point,
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
