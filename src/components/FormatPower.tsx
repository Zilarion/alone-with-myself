import { Text } from '@hope-ui/solid';
import BoltIcon from '@suid/icons-material/BoltOutlined';

import { FormatNumber } from './FormatNumber';

interface FormatPowerProps {
    amount: number;
    disabled?: boolean;
}

export const FormatPower = (props: FormatPowerProps) => {
    const color = () => props.disabled ? '$neutral7' : 'yellow';

    return (
        <Text color={color()} display="flex" alignItems='center'>
            <FormatNumber
                value={props.amount}
                compact
            />
            <BoltIcon fontSize='inherit' />
        </Text>
    );
};
