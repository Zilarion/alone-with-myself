import { Flex } from '@hope-ui/solid';
import { For } from 'solid-js';

import { ResourceIndicator } from '../../../components/ResourceIndicator';
import { Satellite } from '../../../models/Satellite';

interface LocationSummaryProps {
    satellite: Satellite;
}

export const SatelliteSummary = (props: LocationSummaryProps) => {
    return <Flex
        direction='column'
        gap='$2'
    >
        <For each={props.satellite.storage.resources}>
            {resource => <ResourceIndicator resource={resource} />}
        </For>
    </Flex>;
};
