import {
    Entity,
    PrintablesPoint,
} from '../internal';
import { PrintablesPointActions } from './PrintablesPointActions';

interface InformationPanel {
    entity: Entity;
}

export function ActionPanel({ entity }: InformationPanel) {
    return <>
        {entity instanceof PrintablesPoint && <PrintablesPointActions point={entity} />}
    </>;
}

