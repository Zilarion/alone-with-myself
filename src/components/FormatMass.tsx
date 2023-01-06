import { Text } from '@hope-ui/solid';
import MassIcon from '@suid/icons-material/CycloneOutlined';

import { FormatNumber } from './FormatNumber';

interface FormatMassProps {
    amount: number;
    disabled?: boolean;
}

export const FormatMass = (props: FormatMassProps) => {
    const color = () => props.disabled ? '$neutral7' : '$info10';

    return (
        <Text color={color()} display="flex" alignItems='center'>
            <FormatNumber
                value={props.amount}
                compact
            />
            <MassIcon fontSize='inherit' />
        </Text>
    );
};
