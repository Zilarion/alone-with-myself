
import {
    Harvester,
    HarvesterProperties,
} from '../models/Harvester';
import { PrintableType } from '../models/PrintableType';
import { ResourceType } from '../models/ResourceType';
import { assert } from '../util';
import { PRINTABLES } from './Printables';

const harvesterProperties = new Map<PrintableType, HarvesterProperties>([
    [ PrintableType.miner , {
        produces: [ {
            type: ResourceType.minerals,
            amount: 0.1,
        } ],
    } ],
]);

const harvesterInfo = new Map<PrintableType, Harvester>();

Array.from(harvesterProperties.entries()).forEach(([ type, properties ]) => {
    const printInfo = PRINTABLES.get(type);
    assert(printInfo != null, `Expected printable ${type} to be defined. Cannot created harvester out of it otherwise.`);

    harvesterInfo.set(type, {
        ... printInfo,
        ... properties,
    });
});

export const HARVESTERS = harvesterInfo;
