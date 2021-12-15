import {
    Instance,
    types,
} from 'mobx-state-tree';
import { ResourceType } from 'src/internal';

const ResourceModel = types
    .model({
        type: types.enumeration(Object.values(ResourceType)),
        amount: types.number,
    });
export interface Resource extends Instance<typeof ResourceModel>{}

export const ResourceSetModel = types.array(ResourceModel);
export interface ResourceSet extends Instance<typeof ResourceSetModel> {}
