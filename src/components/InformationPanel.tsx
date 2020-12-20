

import { AsteroidBelt } from '../drawables/AsteroidBelt';
import { Body } from '../drawables/Body';
import {
    HeadquarterPoint,
    ResourcePoint,
} from '../models';
import { Entity } from '../models/core';
import { AsteroidBeltSummary } from './AsteroidBeltSummary';
import { BodySummary } from './BodySummary';
import { HeadquarterSummary } from './HeadquarterSummary';
import { ResourcePointSummary } from './ResourcePointSummary';

interface InformationPanel {
    entity: Entity;
}

export function InformationPanel({ entity }: InformationPanel) {
    return <>
        {entity instanceof Body && <BodySummary body={entity} />}
        {entity instanceof ResourcePoint && <ResourcePointSummary point={entity} />}
        {entity instanceof HeadquarterPoint && <HeadquarterSummary point={entity} />}
        {entity instanceof AsteroidBelt && <AsteroidBeltSummary belt={entity} />}
    </>;
}
