
import { TinyColor } from '@ctrl/tinycolor';

import { Body } from '../models';
import { drawCircle } from './drawCircle';
import { drawOrbit } from './drawOrbit';
import { drawSelectionCircle } from './drawSelectionCircle';

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
    },
    showOrbit = true,
}: DrawBodyProps) {
    if (showOrbit && orbit) {
        drawOrbit({
            context,
            orbit,
        });
    }

    if (selected) {
        drawSelectionCircle({
            context,
            radius,
            center: position,
        });
    }

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
