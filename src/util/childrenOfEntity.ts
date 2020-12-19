import { Entity } from '../models/core';

export function childrenOfEntity(entity: Entity): Entity[] {
    const children = entity.children.map(childrenOfEntity);
    return [
        entity,
        ... children.flat(),
    ];
}
