import {
    Entity,
    EntityType,
} from '../models';

export function findSelectedEntity(entities: Entity[]): Entity | null {
    return entities.reduce<Entity | null>((prev, current) => {
        if (prev == null) {
            return current;
        }

        if (current.type === EntityType.InteractionPoint) {
            return current;
        }

        if (prev.type === EntityType.InteractionPoint) {
            return prev;
        }

        if (current.type === EntityType.AsteroidBelt) {
            return current;
        }

        if (prev.type === EntityType.AsteroidBelt) {
            return prev;
        }

        return current;
    }, null);
}
