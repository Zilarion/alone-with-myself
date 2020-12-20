import { Body } from '../models';
import { DrawableEntity } from '../models/core';
import {
    AsteroidBelt,
    drawAsteroidBelt,
} from './AsteroidBelt';
import { drawBody } from './drawBody';

export function drawEntity(context: CanvasRenderingContext2D, entity: DrawableEntity) {
    if (entity instanceof AsteroidBelt) {
        drawAsteroidBelt({
            context,
            model: entity,
        });
    }

    if (entity instanceof Body) {
        return drawBody({
            context,
            model: entity,
        });
    }
}
