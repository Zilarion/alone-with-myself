import { Text } from '@hope-ui/solid';

import { ResourceType } from '../models/types/ResourceType';
import { FormattedResource } from './FormattedResource';

export const FormattedMinerals = (props: { amount: number }) => {
    return (
        <Text color="$info10" display="flex" alignItems='center'>
            <FormattedResource
                value={props.amount}
                type={ResourceType.minerals}
                compact
            />
        </Text>
    );
};
