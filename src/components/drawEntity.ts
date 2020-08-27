import { Body } from '../models';
import { AsteroidBelt } from '../models/AsteroidBelt';
import { Entity } from '../models/Entity';
import { drawAsteroidBelt } from './drawAsteroidBelt';
import { drawBody } from './drawBody';

export function drawEntity(context: CanvasRenderingContext2D, entity: Entity) {
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
