import {
    Entity,
    ResourcePoint,
} from '../models';
import { ResourcePointActions } from './ResourcePointActions';

interface InformationPanel {
    entity: Entity;
}

export function ActionPanel({ entity }: InformationPanel) {
    return <>
        {entity instanceof ResourcePoint && <ResourcePointActions point={entity} />}
    </>;
}

