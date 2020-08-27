
import tinycolor, { TinyColor } from '@ctrl/tinycolor';

import { Body } from '../models';
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

    const {
        x,
        y,
    } = position;
    context.beginPath();
    context.fillStyle = fillColor;
    context.arc(
        x, y,
        radius,
        0, 2 * Math.PI,
    );
    context.fill();
}
