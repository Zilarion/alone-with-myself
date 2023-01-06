import { Text } from '@hope-ui/solid';
import MassIcon from '@suid/icons-material/CycloneOutlined';

import { FormatNumber } from './FormatNumber';

export const FormatMass = (props: { amount: number }) => {
    return (
        <Text color="$info10" display="flex" alignItems='center'>
            <FormatNumber
                value={props.amount}
                compact
            />
            <MassIcon fontSize='inherit' />
        </Text>
    );
};
