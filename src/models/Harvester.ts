import { Printable } from './Printable';
import { ResourceSet } from './ResourceSet';

export interface HarvesterProperties {
    produces: ResourceSet;
}

export type Harvester = Printable & HarvesterProperties;
