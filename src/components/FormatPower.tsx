import { Text } from '@hope-ui/solid';
import BoltIcon from '@suid/icons-material/BoltOutlined';
import { Show } from 'solid-js';

import { FormatChange } from './FormatChange';
import { FormatNumber } from './FormatNumber';

interface FormatPowerProps {
    amount: number;
    change?: number;
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

            <Show when={props.change != null}>
                <FormatChange
                    value={props.change!}
                />
            </Show>
        </Text>
    );
};
