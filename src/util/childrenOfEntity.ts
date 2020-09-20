import { Entity } from '../models';

export function childrenOfEntity(entity: Entity): Entity[] {
    const children = entity.children.map(childrenOfEntity);
    return [
        entity,
        ... children.flat(),
    ];
}
