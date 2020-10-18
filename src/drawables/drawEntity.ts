import {
    AsteroidBelt,
    Body,
    Entity,
} from '../models';
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
