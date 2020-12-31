import {
    AsteroidBelt,
    Body,
    Entity,
    HeadquarterPoint,
    ManufacturerPoint,
    ResourcePoint,
} from '../internal';
import { AsteroidBeltSummary } from './AsteroidBeltSummary';
import { BodySummary } from './BodySummary';
import { HeadquarterSummary } from './HeadquarterSummary';
import { ManufacturerPointSummary } from './ManufacturerPointSummary';
import { ResourcePointSummary } from './ResourcePointSummary';

interface InformationPanel {
    entity: Entity;
}

export function InformationPanel({ entity }: InformationPanel) {
    return <>
        {entity instanceof Body && <BodySummary body={entity} />}
        {entity instanceof ResourcePoint && <ResourcePointSummary point={entity} />}
        {entity instanceof ManufacturerPoint && <ManufacturerPointSummary point={entity} />}
        {entity instanceof HeadquarterPoint && <HeadquarterSummary point={entity} />}
        {entity instanceof AsteroidBelt && <AsteroidBeltSummary belt={entity} />}
    </>;
}
