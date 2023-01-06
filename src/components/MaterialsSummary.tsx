import { Flex } from '@hope-ui/solid';

import { Materials } from '../models/types/Materials';
import { FormatMass } from './FormatMass';
import { FormatPower } from './FormatPower';

interface ResourceSetSummaryProps {
    materials: Materials;
    disabled?: boolean;
}

export const MaterialsSummary = (props: ResourceSetSummaryProps) => {
    return <Flex gap="$2">
        <FormatMass
            amount={props.materials.mass}
            disabled={props.disabled}
        />
        <FormatPower
            amount={props.materials.power}
            disabled={props.disabled}
        />
    </Flex>;
};
