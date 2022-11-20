import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { Resource } from '../models/types/ResourceSet';
import { FormattedResource } from './FormattedResource';

interface ResourceIndicatorProps {
    resource: Resource;
}

export const ResourceIndicator = observer(({
    resource: {
        amount,
        type,
    },
}: ResourceIndicatorProps) => {
    return <>
        <Typography color="primary">
            {type}
        </Typography>
        <FormattedResource
            value={amount}
            type={type}
        />
    </>;
});
