import { Text } from '@hope-ui/solid';

import { Resource } from '../models/types/ResourceSet';
import { FormattedResource } from './FormattedResource';

interface ResourceIndicatorProps {
    resource: Resource;
}

export const ResourceIndicator = (props: ResourceIndicatorProps) => {
    return <>
        <Text color="$primary">
            {props.resource.type}
        </Text>
        <FormattedResource
            value={props.resource.amount}
            type={props.resource.type}
        />
    </>;
};
