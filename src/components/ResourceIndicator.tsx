import { Text } from '@hope-ui/solid';

import { Resource } from '../models/types/ResourceSet';
import { FormatNumber } from './FormatNumber';

interface ResourceIndicatorProps {
    resource: Resource;
}

export const ResourceIndicator = (props: ResourceIndicatorProps) => {
    return <>
        <Text color="$primary">
            {props.resource.type}
        </Text>
        <FormatNumber
            value={props.resource.amount}
            type={props.resource.type}
        />
    </>;
};
