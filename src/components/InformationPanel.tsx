import * as React from 'react';

import {
    AsteroidBelt,
    Body,
    Entity,
    ResourcePoint,
} from '../models';
import { AsteroidBeltSummary } from './AsteroidBeltSummary';
import { BodySummary } from './BodySummary';
import { FloatingSidebar } from './FloatingSidebar';
import { ResourcePointSummary } from './ResourcePointSummary';

interface InformationPanel {
    entity: Entity;
}

export function InformationPanel({ entity }: InformationPanel) {
    return <FloatingSidebar>
        {entity instanceof Body && <BodySummary body={entity} />}
        {entity instanceof ResourcePoint && <ResourcePointSummary point={entity} />}
        {entity instanceof AsteroidBelt && <AsteroidBeltSummary belt={entity} />}
    </FloatingSidebar>;
}
