import {
    Instance,
    types,
} from 'mobx-state-tree';

import { ResourceType } from '../../internal';

const ResourceModel = types
    .model({
        type: types.enumeration(Object.values(ResourceType)),
        amount: types.number,
    });

export const ResourceSetModel = types.array(ResourceModel);
export interface ResourceSet extends Instance<typeof ResourceSetModel> {}
