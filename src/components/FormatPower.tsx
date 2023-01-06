import { Text } from '@hope-ui/solid';
import BoltIcon from '@suid/icons-material/BoltOutlined';

import { FormatNumber } from './FormatNumber';

export const FormatPower = (props: { amount: number }) => {
    return (
        <Text color="yellow" display="flex" alignItems='center'>
            <FormatNumber
                value={props.amount}
                compact
            />
            <BoltIcon fontSize='inherit' />
        </Text>
    );
};
