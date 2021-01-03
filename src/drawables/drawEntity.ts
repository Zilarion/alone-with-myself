import {
    AsteroidBelt,
    Body,
    DrawableEntity,
    drawAsteroidBelt,
    drawBody,
} from '../internal';

export function drawEntity(context: OffscreenCanvasRenderingContext2D, entity: DrawableEntity) {
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
