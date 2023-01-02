import { Text } from '@hope-ui/solid';

import { ResourceType } from '../models/types/ResourceType';
import { FormattedResource } from './FormattedResource';

export const FormattedPower = (props: { amount: number }) => {
    return (
        <Text color="yellow" display="flex" alignItems='center'>
            <FormattedResource
                value={props.amount}
                type={ResourceType.power}
                compact
            />
        </Text>
    );
};
