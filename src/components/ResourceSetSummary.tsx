import { ResourceStorage } from '../models/ResourceStorage';
import { ResourceType } from '../models/types/ResourceType';
import { FormattedMinerals } from './FormattedMinerals';
import { FormattedPower } from './FormattedPower';

interface ResourceSetSummaryProps {
    storage: ResourceStorage;
}

export const ResourceSetSummary = (props: ResourceSetSummaryProps) => {
    return <>
        <FormattedMinerals
            amount={props.storage.findOrNull(ResourceType.minerals)?.amount ?? 0}
        />

        <FormattedPower
            amount={props.storage.findOrNull(ResourceType.power)?.amount ?? 0}
        />
    </>;
};
