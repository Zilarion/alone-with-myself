import { observer } from 'mobx-react-lite';

import {
    Entity,
    PrintablesPoint,
} from '../internal';
import { PrintablesPointActions } from './PrintablesPointActions';

interface InformationPanel {
    entity: Entity;
}

export const ActionPanel = observer(({ entity }: InformationPanel) => {
    return <>
        {entity instanceof PrintablesPoint && <PrintablesPointActions point={entity} />}
    </>;
});

