import { ResourcePoint } from '../models';
import { Entity } from '../models/core';
import { ResourcePointActions } from './ResourcePointActions';

interface InformationPanel {
    entity: Entity;
}

export function ActionPanel({ entity }: InformationPanel) {
    return <>
        {entity instanceof ResourcePoint && <ResourcePointActions point={entity} />}
    </>;
}

