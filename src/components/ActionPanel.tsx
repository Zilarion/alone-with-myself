import {
    Entity,
    ResourcePoint,
    Transporter,
} from '../internal';
import { ResourcePointActions } from './ResourcePointActions';
import { TransporterActions } from './TransporterActions';

interface InformationPanel {
    entity: Entity;
}

export function ActionPanel({ entity }: InformationPanel) {
    return <>
        {entity instanceof ResourcePoint && <ResourcePointActions point={entity} />}
        {entity instanceof Transporter && <TransporterActions transporter={entity} />}
    </>;
}

