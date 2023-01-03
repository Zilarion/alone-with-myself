import { Flex } from '@hope-ui/solid';

import { Materials } from '../models/types/Materials';
import { FormattedMass } from './FormattedMinerals';
import { FormattedPower } from './FormattedPower';

interface ResourceSetSummaryProps {
    materials: Materials;
}

export const MaterialsSummary = (props: ResourceSetSummaryProps) => {
    return <Flex gap="$4">
        <FormattedMass
            amount={props.materials.mass}
        />
        <FormattedPower
            amount={props.materials.power}
        />
    </Flex>;
};
