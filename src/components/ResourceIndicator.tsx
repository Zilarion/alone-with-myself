import { Text } from '@hope-ui/solid';

import { Resource } from '../models/types/ResourceSet';
import { FormattedResource } from './FormattedResource';

interface ResourceIndicatorProps {
    resource: Resource;
}

export const ResourceIndicator = ({
    resource: {
        amount,
        type,
    },
}: ResourceIndicatorProps) => {
    return <>
        <Text color="$primary">
            {type}
        </Text>
        <FormattedResource
            value={amount}
            type={type}
        />
    </>;
};
