import { Flex } from '@hope-ui/solid';

import { Materials } from '../models/types/Materials';
import { FormatMass } from './FormatMass';
import { FormatPower } from './FormatPower';

interface ResourceSetSummaryProps {
    materials: Materials;
}

export const MaterialsSummary = (props: ResourceSetSummaryProps) => {
    return <Flex gap="$4">
        <FormatMass amount={props.materials.mass} />
        <FormatPower amount={props.materials.power} />
    </Flex>;
};
